const express = require("express");
const router = express.Router();
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../controllers/captain.controller");
const { auth } = require("../Middlewares/auth.middleware");


router.post("/register", registerCaptain)
router.post("/login", loginCaptain)
router.get("/profile", auth(["captain"]), getCaptainProfile)
router.get("/logout", auth(["captain"]), logoutCaptain)


module.exports = router