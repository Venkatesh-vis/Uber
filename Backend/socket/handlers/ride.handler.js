const Ride = require("../../models/ride.model");
const Captain = require("../../models/captain.model");
const User = require("../../models/user.model");
const { findNearbyCaptains } = require("../../services/captain.service");
const {SOCKET_EVENTS} = require("../sockets.events");
const {calculateFinalFare} = require("../../services/fare.service");

const registerRideHandlers = (io, socket) => {

    // ride request
    socket.on(SOCKET_EVENTS.RIDE_REQUEST, async (data) => {
        try {
            const { userId, pickup, drop, vehicleType, pickupAddressName, dropAddressName, userName } = data;

            const captains = await findNearbyCaptains(
                pickup.lat,
                pickup.lng,
                vehicleType,
                15000
            );

            const captainIds = captains.map(c => c._id);

            const {finalFare} = calculateFinalFare(pickup, drop, vehicleType);

            const ride = await Ride.create({
                user: userId,
                pickup: {
                    type: "Point",
                    coordinates: [pickup.lng, pickup.lat],
                },
                drop: {
                    type: "Point",
                    coordinates: [drop.lng, drop.lat],
                },
                vehicleType,
                fare: finalFare,
                status: "requested",

                pickupAddress: pickupAddressName,
                dropAddress: dropAddressName,

                notifiedCaptains: captainIds,

                requestedAt: new Date(),
                expiresAt: new Date(Date.now() + 60000),
            });


            const payload = {
                rideId: ride._id,
                userId,
                pickup,
                drop,
                vehicleType,
                pickupAddressName,
                dropAddressName,
                userName
            };


            captains.forEach((captain) => {
                const room = `captain:${captain._id}`;

                console.log("Emitting to:", room);

                io.to(room).emit(SOCKET_EVENTS.RIDE_REQUEST, payload);
            });

            socket.emit(SOCKET_EVENTS.RIDE_CREATED, {
                rideId: ride._id,
                fare: finalFare,
            });

        } catch (err) {
            console.log("ride:request error:", err.message);
        }
    });

    // ride accept
    socket.on(SOCKET_EVENTS.RIDE_ACCEPT, async ({ rideId }) => {
        try {
            const captainId = socket.userId;

            // Ensure captain is available
            const captain = await Captain.findOne({
                _id: captainId,
                status: "active"
            });

            if (!captain) {
                return socket.emit(SOCKET_EVENTS.RIDE_FAILED, {
                    message: "Captain not available",
                });
            }

            // Assign ride
            const ride = await Ride.findOneAndUpdate(
                { _id: rideId, status: "requested" },
                { status: "accepted", captain: captainId },
                { new: true }
            );

            if (!ride) {
                return socket.emit(SOCKET_EVENTS.RIDE_FAILED, {
                    message: "Ride already taken or invalid",
                });
            }

            // GENERATE OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();

            await Ride.findByIdAndUpdate(ride._id, {otp, otpVerified: false});

            // Set captain busy
            const updatedCaptain = await Captain.findOneAndUpdate(
                { _id: captainId, status: "active" },
                { status: "busy" },
                { new: true }
            );

            // Rollback if captain update fails
            if (!updatedCaptain) {
                await Ride.findByIdAndUpdate(rideId, {
                    status: "requested",
                    captain: null,
                    otp: null,
                    otpVerified: false
                });

                return socket.emit(SOCKET_EVENTS.RIDE_FAILED, {
                    message: "Captain already busy",
                });
            }

            // Fetch user
            const user = await User.findById(ride.user);
            const name = `${user.fullname.firstname} ${user.fullname.lastname}`;

            // Prepare captain details
            const captainDetails = {
                id: updatedCaptain._id,
                name: `${updatedCaptain.fullname.firstname} ${updatedCaptain.fullname.lastname}`,
                vehicleNumber: updatedCaptain.vehicle.plate,
                vehicleColor: updatedCaptain.vehicle.color,
            };

            // CREATE CHAT ROOM
            const chatRoom = `chat:${ride._id}`;

            // captain joins immediately
            socket.join(chatRoom);

            // tell user to join
            io.to(`user:${ride.user}`).emit("chat:init", { chatRoom });

            // Notify user
            io.to(`user:${ride.user}`).emit(SOCKET_EVENTS.RIDE_ACCEPTED, {
                rideId: ride._id,
                captain: captainDetails,
                drop: ride.dropAddress,
                fare: ride.fare,
                vehicleType: ride.vehicleType,
                chatRoom,
                otp,
            });

            // Notify captain
            socket.emit(SOCKET_EVENTS.RIDE_ACCEPTED, {
                ride: ride,
                name,
                chatRoom,
            });

            console.log("📡 Emitting ride:accepted to:", `user:${ride.user}`);

            // Cancel for other captains
            if (ride.notifiedCaptains?.length) {
                ride.notifiedCaptains.forEach((id) => {
                    if (id.toString() !== captainId.toString()) {
                        io.to(`captain:${id}`).emit(
                            SOCKET_EVENTS.RIDE_CANCELLED,
                            { rideId: ride._id }
                        );
                    }
                });
            }

        } catch (err) {
            console.log("ride:accept error:", err.message);
        }
    });

    // verify otp
    socket.on(SOCKET_EVENTS.OTP_VERIFY, async ({ rideId, otp }) => {
        if (!rideId || !otp) return;

        try {
            const ride = await Ride.findById(rideId);

            if (!ride) {
                return socket.emit("ride:error", { message: "Ride not found" });
            }

            if (ride.otp !== otp) {
                return socket.emit("ride:error", { message: "Invalid OTP" });
            }

            // update ride
            ride.otpVerified = true;
            ride.status = "ongoing";
            await ride.save();

            const room = `chat:${rideId}`;

            // notify both user & captain
            io.to(room).emit(SOCKET_EVENTS.OTP_VERIFIED, {rideId,});

            io.to(room).emit(SOCKET_EVENTS.RIDE_STARTED, {rideId,});

            console.log("✅ OTP VERIFIED, ride started:", rideId);

        } catch (err) {
            console.log("OTP verify error:", err.message);
        }
    });

    // ride cancel
    socket.on(SOCKET_EVENTS.RIDE_CANCEL, async ({ rideId }) => {
        try {
            const ride = await Ride.findByIdAndUpdate(
                rideId,
                { status: "cancelled" },
                { new: true }
            );

            if (!ride) return;

            ride.notifiedCaptains.forEach((captainId) => {
                io.to(`captain:${captainId}`).emit(SOCKET_EVENTS.RIDE_CANCELLED, { rideId });
            });

        } catch (err) {
            console.log("ride:cancel error:", err.message);
        }
    });
};

module.exports = registerRideHandlers;