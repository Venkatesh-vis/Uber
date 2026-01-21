const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: 4,
                trim: true,
            },
            lastname: {
                type: String,
                required: true,
                minlength: 4,
                trim: true,
            },
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        socketId: {
            type: String,
            default: null,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },

        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: 3,
                trim: true,
            },
            plate: {
                type: String,
                required: true,
                minlength: 6,
                trim: true,
            },
            capacity: {
                type: Number,
                required: true,
                min: 1,
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ["car", "motorcycle", "auto"],
            },
        },

        location: {
            lat: {
                type: Number,
                default: null,
            },
            lng: {
                type: Number,
                default: null,
            },
        },
    },
    { timestamps: true }
);

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;
