const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

/* ===================== REGISTER USER ===================== */
const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    /* -------- BASIC VALIDATION -------- */
    if (!email || !password || !fullname?.firstname || !fullname?.lastname) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    if (fullname.firstname.length < 4 || fullname.lastname.length < 4) {
        return res.status(400).json({
            message: "Firstname and lastname must be at least 4 characters long",
        });
    }

    if (password.length < 4) {
        return res.status(400).json({
            message: "Password must be at least 4 characters long",
        });
    }

    /* -------- CHECK EXISTING USER -------- */
    const existingUser = await userModel.findOne({ email }).exec();
    if (existingUser) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    /* -------- CREATE USER -------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password: hashedPassword,
    });


    const token = jwt.sign(
        { _id: user._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
    });

    res.status(201).json({
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
        },
    });
};

/* ===================== LOGIN USER ===================== */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const token = jwt.sign(
        { _id: user._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
    });

    res.status(200).json({
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
        },
    });
};

/* ===================== GET USER PROFILE ===================== */
const getUserProfile = async (req, res) => {
    res.status(200).json({
        id: req.user._id,
        email: req.user.email,
        fullname: req.user.fullname,
    });
};

/* ===================== LOGOUT USER ===================== */
const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
};
