const {calculateFinalFare} = require("../services/fare.service");
const { pricing, surgeMultiplier } = require("../services/utils");

const fare = async (req, res) => {
    try {
        const { pickup, drop } = req.body;

        if (!pickup || !drop) {
            return res.status(400).json({
                message: "Pickup and drop locations are required",
            });
        }

        if (
            pickup.lat == null ||
            pickup.lng == null ||
            drop.lat == null ||
            drop.lng == null
        ) {
            return res.status(400).json({
                message: "Invalid pickup or drop coordinates",
            });
        }

        const rideOptions = Object.keys(pricing).map((type) => {
            const result = calculateFinalFare(pickup, drop, type);

            return {
                vehicleType: type,
                distance: result.distance.toFixed(2) + " km",
                duration: Math.round(result.duration) + " mins",
                originalFare: result.originalFare,
                discountPercent: result.discountPercent,
                discountAmount: result.discountAmount,
                finalFare: result.finalFare,
            };
        });

        res.json({
            surgeMultiplier: surgeMultiplier.toFixed(2),
            rideOptions,
        });

    } catch (error) {
        res.status(500).json({message: error.message,});
    }
};

module.exports = { fare };