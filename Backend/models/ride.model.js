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
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },

    drop: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },

    vehicleType: {
        type: String,
        enum: ["car", "motorcycle", "auto"],
        required: true,
    },

    fare: {
        type: Number,
        default: 0,
    },

    status: {
        type: String,
        enum: ["requested", "accepted", "ongoing", "completed", "cancelled"],
        default: "requested",
    },
    notifiedCaptains: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captain",
        }
    ],
    otp: {
        type: String,
        default: null,
    },

    otpVerified: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });


rideSchema.index({ pickup: "2dsphere" });
rideSchema.index({ drop: "2dsphere" });
rideSchema.index({ status: 1 });
rideSchema.index({ user: 1 });
rideSchema.index({ captain: 1 });

const Ride = mongoose.models.Ride || mongoose.model("Ride", rideSchema);

module.exports = Ride;