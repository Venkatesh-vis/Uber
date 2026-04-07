const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

/* ===================== REGISTER USER ===================== */
const registerUser = async (req, res) => {
    try {
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

        const existingUser = await userModel.findOne({ email }).exec();
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

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
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.status(201).json({
            user
        });
    }
    catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({message: "Internal server error",});
    }
};

/* ===================== LOGIN USER ===================== */
const loginUser = async (req, res) => {
    try {
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
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });

        res.status(200).json({
            user
        });
    }
    catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({message: "Internal server error"});
    }
};


const updateUserDetails = async (req, res) => {
    try {
        const { fullname, email } = req.body;

        const userId = req.auth.id;

        const updateFields = {};

        if (fullname) {
            if (fullname.firstname && fullname.firstname.length < 4) {
                return res.status(400).json({
                    message: "Firstname must be at least 4 characters long",
                });
            }

            if (fullname.lastname && fullname.lastname.length < 4) {
                return res.status(400).json({
                    message: "Lastname must be at least 4 characters long",
                });
            }

            if (fullname.firstname) {
                updateFields["fullname.firstname"] = fullname.firstname;
            }

            if (fullname.lastname) {
                updateFields["fullname.lastname"] = fullname.lastname;
            }
        }

        if (email) {
            const normalizedEmail = email.trim().toLowerCase();

            const existingUser = await userModel.findOne({ email: normalizedEmail });

            if (existingUser && existingUser._id.toString() !== userId.toString()) {
                return res.status(409).json({message: "Email is already in use",});
            }

            updateFields.email = normalizedEmail;
        }


        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({message: "No valid fields provided for update"});
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json(updatedUser);

    } catch (err) {
        console.error("Error updating user details:", err);
        return res.status(500).json({message: "Internal server error"});
    }
};

/* ===================== LOGOUT USER ===================== */
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });

        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        console.error("Error logging out user:", err);
        res.status(500).json({ message: "Internal server error" });
    }

};

module.exports = {registerUser, loginUser, getUserProfile, logoutUser, updateUserDetails, };
