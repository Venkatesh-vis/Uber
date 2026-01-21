const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainModel = require("../models/captain.model");

/* ===================== REGISTER CAPTAIN ===================== */
const registerCaptain = async (req, res) => {
    const { fullname, email, password, vehicle, location } = req.body;

    if (!email || !password || !fullname?.firstname || !fullname?.lastname || !vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
        return res.status(400).json({
            message: "All required fields must be provided",
        });
    }

    if (fullname.firstname.length < 4 || fullname.lastname.length < 4) {
        return res.status(400).json({
            message: "Firstname and lastname must be at least 4 characters long",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long",
        });
    }

    if (vehicle.color.length < 3 || vehicle.plate.length < 6) {
        return res.status(400).json({
            message: "Invalid vehicle details",
        });
    }

    if (!["car", "motorcycle", "auto"].includes(vehicle.vehicleType)) {
        return res.status(400).json({
            message: "Invalid vehicle type",
        });
    }

    const existingCaptain = await captainModel.findOne({ email }).exec();
    if (existingCaptain) {
        return res.status(409).json({
            message: "Captain already exists",
        });
    }

    /* -------- CREATE CAPTAIN -------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    const captain = await captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        },
        location,
    });


    const token = jwt.sign(
        { _id: captain._id, role: "captain" },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
        captain: {
            id: captain._id,
            email: captain.email,
            fullname: captain.fullname,
            vehicle: captain.vehicle,
            status: captain.status,
        },
    });
};

/* ===================== LOGIN CAPTAIN ===================== */
const loginCaptain = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    const captain = await captainModel
        .findOne({ email })
        .select("+password")
        .exec();

    if (!captain) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const token = jwt.sign(
        { _id: captain._id, role: "captain" },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
        captain: {
            id: captain._id,
            email: captain.email,
            fullname: captain.fullname,
            vehicle: captain.vehicle,
            status: captain.status,
        },
    });
};

/* ===================== GET CAPTAIN PROFILE ===================== */
const getCaptainProfile = async (req, res) => {
    res.status(200).json({
        id: req.captain._id,
        email: req.captain.email,
        fullname: req.captain.fullname,
        vehicle: req.captain.vehicle,
        status: req.captain.status,
        location: req.captain.location,
    });
};

/* ===================== LOGOUT CAPTAIN ===================== */
const logoutCaptain = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
};
