const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captain",
            default: null,
        },
        pickup: {
            lat: Number,
            lng: Number,
        },
        drop: {
            lat: Number,
            lng: Number,
        },
        fare: Number,
        status: {
            type: String,
            enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true });

rideSchema.index({ status: 1 });
rideSchema.index({ user: 1 });
rideSchema.index({ captain: 1 });

const ride = mongoose.model("Ride", rideSchema);

module.exports = ride