const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainModel = require("../models/captain.model");

/* ===================== REGISTER CAPTAIN ===================== */
const registerCaptain = async (req, res) => {
    try {

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
            captain
        });
    }
    catch {
        res.status(500).json({message: "Internal Server error",});
    }

};

/* ===================== LOGIN CAPTAIN ===================== */
const loginCaptain = async (req, res) => {
    try {
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
            captain
        });
    }
    catch {
        res.status(500).json({message: "Internal Server error",});
    }

};

/* ===================== GET CAPTAIN PROFILE ===================== */
const getCaptainProfile = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.auth.id);

        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        res.status(200).json(captain);
    }
    catch {
        res.status(500).json({message: "Internal Server error",});
    }
};

/* ===================== LOGOUT CAPTAIN ===================== */
const logoutCaptain = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ message: "Logged out successfully" });
    }
    catch {
        res.status(500).json({message: "Internal Server error",});
    }

};

/* ===================== UPDATE CAPTAIN STATUS ===================== */

const updateCaptainStatus = async (req, res) => {
    const CaptainStatus = ["active", "inactive"]
    try {
        const { status } = req.body;

        if (!CaptainStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const captain = await captainModel.findByIdAndUpdate(
            req.auth.id,
            { status },
            { new: true }
        );

        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        return res.status(200).json({
            message: "Status updated successfully",
            captain
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
};
module.exports = {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain, updateCaptainStatus,};
