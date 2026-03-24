const jwt = require("jsonwebtoken");

const auth = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            const token =
                req.cookies?.token ||
                req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "No token" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.auth = {id: decoded._id, role: decoded.role,};

            if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    };
};


module.exports = {auth};
