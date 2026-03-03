const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes")
const captainRoutes = require("./captain.routes")
const authRoute = require("./auth.routes");
const fare = require("./fare.route");
const ride = require("./ride.routes");

router.use("/user", userRoutes);
router.use("/captain", captainRoutes);
router.use("/auth", authRoute);
router.use("/fare", fare)
router.use("/ride", ride);

module.exports = router;