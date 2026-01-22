const getCurrentUser = (req, res) => {
    const { role } = req.auth;

    let account;

    if (role === "user") {
        account = req.user;
    } else if (role === "captain") {
        account = req.captain;
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
        user: {
            id: account._id,
            role,
            email: account.email,
            fullname: account.fullname,
        },
    });
};

module.exports = { getCurrentUser };
