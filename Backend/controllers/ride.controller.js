const rideService = require("../services/ride.service");

createRide = async (req, res) => {
    try {
        const { userId, pickup, drop, fare } = req.body;

        const ride = await rideService.createRide({
            userId,
            pickup,
            drop,
            fare,
        });

        res.status(201).json({
            message: "Ride created",
            rideId: ride._id,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

acceptRide = async (req, res) => {
    try {
        const { rideId, captainId } = req.body;

        const ride = await rideService.acceptRide({
            rideId,
            captainId,
        });

        res.json({
            message: "Ride accepted",
            ride,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

cancelRide = async (req, res) => {
    try {
        const { rideId, cancelledBy } = req.body;

        const ride = await rideService.cancelRide({
            rideId,
            cancelledBy,
        });

        res.json({
            message: "Ride cancelled",
            ride,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {createRide, acceptRide, cancelRide};