const {validationResult} = require("express-validator");
const userModel = require("../models/user.model");
const {createUser} = require("../services/user.service")

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });
};

module.exports = {registerUser}