const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, updateUserDetails} = require("../controllers/user.controller");
const {auth} = require("../middlewares/auth.middleware");


router.post("/register" ,registerUser)
router.post("/login" ,loginUser)
router.post("/logout", auth(["user"]), logoutUser)
router.put("/update-user", auth(["user"]), updateUserDetails)


module.exports = router;