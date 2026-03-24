const UserModel = require("../models/user.model");
const CaptainModel = require("../models/captain.model");

const getCurrentUser = async (req, res) => {
    try {
        const { id, role } = req.auth;

        let account;

        if (role === "user") {
            account = await UserModel.findById(id);
        } else if (role === "captain") {
            account = await CaptainModel.findById(id);
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        return res.status(200).json({
            user: account,
            role
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getCurrentUser };