const { rideEmitter } = require("../services/ride.service");

const registerRideEvents = (io) => {

    rideEmitter.on("rideCreated", ({ ride, nearbyCaptains }) => {

        nearbyCaptains.forEach((captain) => {
            if (captain.socketId) {
                io.to(captain.socketId).emit("new-ride-request", {
                    rideId: ride._id,
                    pickup: ride.pickup,
                    drop: ride.drop,
                    fare: ride.fare,
                });
            }
        });
    });

    rideEmitter.on("rideAccepted", ({ ride }) => {
        io.to(ride.user.toString()).emit("ride-accepted", {
            rideId: ride._id,
            captainId: ride.captain,
        });
    });

    rideEmitter.on("rideCancelled", ({ ride, cancelledBy }) => {

        if (cancelledBy === "user" && ride.captain) {
            io.to(ride.captain.toString()).emit("ride-cancelled", {
                rideId: ride._id,
            });
        }

        if (cancelledBy === "captain") {
            io.to(ride.user.toString()).emit("ride-cancelled", {
                rideId: ride._id,
            });
        }
    });
};

module.exports = registerRideEvents;