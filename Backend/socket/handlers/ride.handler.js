const Ride = require("../../models/ride.model");
const { findNearbyCaptains } = require("../../services/captain.service");
const {SOCKET_EVENTS} = require("../sockets.events");

const registerRideHandlers = (io, socket) => {

    // ride request
    socket.on(SOCKET_EVENTS.RIDE_REQUEST, async (data) => {
        try {
            const { userId, pickup, drop, vehicleType } = data;

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
                status: "requested",
            });

            const captains = await findNearbyCaptains(
                pickup.lat,
                pickup.lng,
                vehicleType,
                15000
            );

            const payload = {
                rideId: ride._id,
                userId,
                pickup,
                drop,
                vehicleType,
            };

            captains.forEach((captain) => {
                io.to(`captain:${captain._id}`).emit(SOCKET_EVENTS.RIDE_REQUEST, payload);
            });

        } catch (err) {
            console.log("ride:request error:", err.message);
        }
    });

    // ride accept
    socket.on(SOCKET_EVENTS.RIDE_ACCEPT, async ({ rideId, captainId }) => {
        try {
            const ride = await Ride.findOneAndUpdate(
                { _id: rideId, status: "requested" },
                { status: "accepted", captain: captainId },
                { new: true }
            );

            if (!ride) {
                socket.emit(SOCKET_EVENTS.RIDE_FAILED, {message: "Ride already taken",});
                return;
            }

            io.to(`user:${ride.user}`).emit(SOCKET_EVENTS.RIDE_ACCEPT, {
                rideId,
                captainId,
            });

        } catch (err) {
            console.log("ride:accept error:", err.message);
        }
    });
};

module.exports = registerRideHandlers;