const crypto = require("crypto");
const Payment = require("../models/payment.model");

verifyPayment = async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" });
    }

    await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: "paid"
        }
    );

    res.json({ success: true });
};


module.exports = { verifyPayment }