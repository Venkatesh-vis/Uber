const express = require("express");
const router = express.Router();
const { registerCaptain, loginCaptain, logoutCaptain, updateCaptainStatus, updateCaptainDetails } = require("../controllers/captain.controller");
const { auth } = require("../middlewares/auth.middleware");


router.post("/register", registerCaptain)
router.post("/login", loginCaptain)
router.post("/logout", auth(["captain"]), logoutCaptain)
router.put("/status", auth(["captain"]), updateCaptainStatus)
router.put("/update-captain", auth(["captain"]), updateCaptainDetails)



module.exports = router