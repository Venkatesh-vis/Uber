const express = require("express");
const router = express.Router();
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain, updateCaptainStatus } = require("../controllers/captain.controller");
const { auth } = require("../middlewares/auth.middleware");


router.post("/register", registerCaptain)
router.post("/login", loginCaptain)
router.get("/profile", auth(["captain"]), getCaptainProfile)
router.get("/logout", auth(["captain"]), logoutCaptain)
router.put("/status", auth(["captain"]), updateCaptainStatus)



module.exports = router