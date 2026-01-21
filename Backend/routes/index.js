const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes")
const captainRoutes = require("./captain.routes")

router.use("/user", userRoutes);
router.use("/captain", captainRoutes);

module.exports = router;