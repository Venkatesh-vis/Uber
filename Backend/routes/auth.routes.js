const express = require("express");
const router = express.Router();

const { auth } = require("../Middlewares/auth.middleware");
const { getCurrentUser } = require("../controllers/auth.controller");

router.get("/me", auth(), getCurrentUser);

module.exports = router;
