const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain } = require("../controllers/captain.controller");

router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 4 }).withMessage("first name must must be at least 4 characters long"),
    body('fullname.lastname').isLength({ min: 4 }).withMessage("last name must must be at least 4 characters long"),
    body('password').isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
    body("vehicle.color").isString().isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isString().isLength({ min: 6 }).withMessage("Plate must be at least 6 characters long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be one of: car, motorcycle, auto"),
    body("location.lat").optional().isFloat().withMessage("Latitude must be a number"),
    body("location.long").optional().isFloat().withMessage("Longitude must be a number"),
],registerCaptain)


module.exports = router