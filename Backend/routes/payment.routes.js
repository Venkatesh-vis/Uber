const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");
const { createOrder, verifyPayment } = require("../controllers/payment.controller");

router.post("/create-order", auth(["user"]), createOrder);
router.post("/verify-payment", auth(["user"]), verifyPayment);

module.exports = router;