const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const {registerUser} = require("../controllers/user.controller");

router.post("/register" , [
    body("email").isEmail().withMessage("Email is invalid"),
    body("fullname.firstname").isLength({ min: 4 }).withMessage("First Name should be at least 4 characters long"),
    body("fullname.lastname").isLength({ min: 4 }).withMessage("Last Name should be at least 4 characters long"),
    body("password").isLength({ min: 4 }).withMessage("Password should be at least 4 characters long"),
],registerUser)

module.exports = router;