const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");

const auth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token =
                req.cookies?.token ||
                req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.auth = {
                id: decoded._id,
                role: decoded.role,
                adminRole: decoded.adminRole,
            };

            if (
                allowedRoles.length > 0 &&
                !allowedRoles.includes(decoded.role)
            ) {
                return res.status(403).json({ message: "Forbidden" });
            }

            if (decoded.role === "user") {
                const user = await userModel.findById(decoded._id).exec();
                if (!user) {
                    return res.status(401).json({ message: "User not found" });
                }
                req.user = user;
            }

            if (decoded.role === "captain") {
                const captain = await captainModel.findById(decoded._id).exec();
                if (!captain) {
                    return res.status(401).json({ message: "Captain not found" });
                }
                req.captain = captain;
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    };
};


module.exports = {auth};
