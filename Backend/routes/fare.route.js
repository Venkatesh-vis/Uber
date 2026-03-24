const express = require('express');
const router = express.Router();
const { fare } = require('../controllers/fare.controller');
const { auth } = require("../middlewares/auth.middleware");

router.post('/', auth(["user"]), fare);

module.exports = router;