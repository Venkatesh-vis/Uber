const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes")
const captainRoutes = require("./captain.routes")
const authRoute = require("./auth.routes");

router.use("/user", userRoutes);
router.use("/captain", captainRoutes);
router.use("/auth", authRoute);

module.exports = router;