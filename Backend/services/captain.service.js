const captainModel = require("../models/captain.model");


const createCaptain = async ({ fullname, email, password, vehicle }) => {
    const {firstname, lastname} = fullname
    const {color, plate, capacity, vehicleType} = vehicle

    if (!firstname || !lastname || !email || !password || !vehicleType) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname : {
            firstname,
            lastname
        },
        vehicle : {
            color,
            plate,
            capacity,
            vehicleType
        },
        email,
        password
    })

    return captain

}

module.exports = {createCaptain}