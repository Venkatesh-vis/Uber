const {validationResult} = require("express-validator");
const userModel = require("../models/user.model");
const {createUser} = require("../services/user.service")
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    return res.status(200).json({ token, user });
};

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({ message:"Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message:"Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({ token, user });
}

const getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user);
}

const logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers?.authorization.split("")[1];
    await blacklistTokenModel.create({token})
    res.status(200).json({ message: "Logged out" });
}

module.exports = {registerUser, loginUser, getUserProfile, logoutUser}