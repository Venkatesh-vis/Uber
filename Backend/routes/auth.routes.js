const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");
const { getCurrentUser } = require("../controllers/auth.controller");

router.get("/me", auth(), getCurrentUser);

module.exports = router;
