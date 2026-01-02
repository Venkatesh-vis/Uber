const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message:"No token provided"})
    }

    const isBlackListed = await blacklistTokenModel.findOne({token: token})

    if (isBlackListed) {
        return res.status(401).json({message:"unAuthorized"})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decodedToken._id)
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlackListed = await blacklistTokenModel.findOne({token: token})

    if (isBlackListed) {
        return res.status(401).json({message:"unauthorized"})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decodedToken._id)
        req.captain = captain;
        return next();
    }
    catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = {authUser, authCaptain}