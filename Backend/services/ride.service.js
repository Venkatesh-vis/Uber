const Ride = require("../models/ride.model");
const Captain = require("../models/captain.model");
const EventEmitter = require("events");

class RideEmitter extends EventEmitter {}
const rideEmitter = new RideEmitter();

const createRide = async ({ userId, pickup, drop, fare }) => {

    const ride = await Ride.create({
        user: userId,
        pickup,
        drop,
        fare,
    });

    const nearbyCaptains = await Captain.find({
        status: "active",
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [pickup.lng, pickup.lat],
                },
                $maxDistance: 10000,
            },
        },
    });

    rideEmitter.emit("rideCreated", {
        ride,
        nearbyCaptains,
    });

    return ride;
};


const acceptRide = async ({ rideId, captainId }) => {

    const ride = await Ride.findOneAndUpdate(
        { _id: rideId, status: "pending" },
        { status: "accepted", captain: captainId },
        { new: true }
    );

    if (!ride) {
        throw new Error("Ride already accepted or cancelled");
    }

    rideEmitter.emit("rideAccepted", { ride });

    return ride;
};


const cancelRide = async ({ rideId, cancelledBy }) => {

    const ride = await Ride.findOneAndUpdate(
        {
            _id: rideId,
            status: { $in: ["pending", "accepted"] },
        },
        { status: "cancelled" },
        { new: true }
    );

    if (!ride) {
        throw new Error("Ride cannot be cancelled");
    }

    rideEmitter.emit("rideCancelled", {
        ride,
        cancelledBy,
    });

    return ride;
};

module.exports = {createRide, acceptRide, cancelRide, rideEmitter};