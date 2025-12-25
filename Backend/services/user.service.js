const userModel = require("../models/user.model");

const createUser = ({ fullname, email, password }) => {
    if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
        throw new Error("All fields are required");
    }

    const user = userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password
    });

    return user;
};


module.exports = {createUser}