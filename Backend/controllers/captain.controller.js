const captainModel = require("../models/captain.model")
const { createCaptain } = require("../services/captain.service");
const {validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, vehicle, password} = req.body;
    const {firstname, lastname} = fullname;
    const {color, plate, capacity, vehicleType} = vehicle

    const isCaptainAlreadyExists = await captainModel.findOne({email })

    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        }
    })

    const token = captain.generateAuthToken();

    return res.status(201).json({ token, captain });
}

const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select("password");
    if (!captain) {
        return res.status(400).json({ message: "Invalid mail or password" });
    }

    const isMatch = captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid mail or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({ token, captain });
}

const getCaptainProfile = async (req, res, next) => {
    return res.status(200).json(req.captain);
}

const logoutCaptain = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers?.authorization.split("")[1];
    await blacklistTokenModel.create({token})
    res.status(200).json({ message: "Logged out" });
}

module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain }