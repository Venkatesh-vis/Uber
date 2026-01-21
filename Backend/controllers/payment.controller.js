const Razorpay = require("razorpay");
const Payment = require("../models/payment.model");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    const { amount, captainId } = req.body;

    if (!amount || amount <= 0 || !captainId) {
        return res.status(400).json({
            message: "Amount and captainId are required",
        });
    }

    const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
    });

    await Payment.create({
        userId: req.auth.id,
        captainId,
        razorpayOrderId: order.id,
        amount,
        currency: "INR",
        status: "created",
    });

    res.status(201).json({
        orderId: order.id,
        key: process.env.RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
    });
};

module.exports = { createOrder };
