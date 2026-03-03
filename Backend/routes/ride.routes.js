const express = require("express");
const router = express.Router();
const {createRide, acceptRide, cancelRide} = require("../controllers/ride.controller");

router.post("/create", createRide);
router.post("/accept", acceptRide);
router.post("/cancel", cancelRide);

module.exports = router;