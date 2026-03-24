const Captain = require("../models/captain.model");

const findNearbyCaptains = async (lat, lng, vehicleType, radius = 5000) => {
    return await Captain.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
                $maxDistance: radius,
            },
        },
        status: "active",
        "vehicle.vehicleType": vehicleType,
    });
};

module.exports = { findNearbyCaptains };