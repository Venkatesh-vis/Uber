const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUserProfile, logoutUser} = require("../controllers/user.controller");
const {auth} = require("../Middlewares/auth.middleware");


router.post("/register" ,registerUser)
router.post("/login" ,loginUser)
router.get("/profile", auth(["user"]), getUserProfile)
router.get("/logout", auth(["user"]), logoutUser)


module.exports = router;