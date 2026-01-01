const captainModel = require("../models/captain.model")
const { createCaptain } = require("../services/captain.service");
const {validationResult } = require("express-validator");

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

    res.status(201).json({ token, captain });
}



module.exports = { registerCaptain }