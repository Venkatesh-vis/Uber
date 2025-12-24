const userModel = require("../models/user.model");

const createUser = ({firstname, lastname, email, password}) => {
    if (!email || !password || !firstname || !lastname) {
        throw new Error("All fields are required");
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user
}

module.exports = {createUser}