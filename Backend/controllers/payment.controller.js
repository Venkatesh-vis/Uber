const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment.model");
const Ride = require("../models/ride.model");
const Captain = require("../models/captain.model");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
});

const createOrder = async (req, res) => {
    try {
        const { rideId } = req.body;

        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Check existing payment PREVENT DOUBLE CLICK ISSUE
        const existingPayment = await Payment.findOne({
            rideId,
            status: { $in: ["created", "paid"] }
        });

        if (existingPayment) {
            return res.json({
                order: {
                    id: existingPayment.razorpayOrderId,
                    amount: existingPayment.amount * 100,
                    currency: existingPayment.currency
                }
            });
        }


        const order = await razorpay.orders.create({
            amount: ride.fare * 100,
            currency: "INR",
        });

        await Payment.create({
            userId: ride.user,
            captainId: ride.captain,
            rideId,
            razorpayOrderId: order.id,
            amount: ride.fare,
            status: "created",
        });

        res.json({ order });
    }

    catch (err) {
        console.log("create order error:", err.message);
        return res.status(500).json({ message: "Failed to create order" });
    }
};

const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            rideId
        } = req.body;

        const ride = await Ride.findById(rideId);

        if (!ride || ride.user.toString() !== req.auth.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_TEST_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Already paid
        if (payment.status === "paid") {
            return res.json({ success: true });
        }

        // Check duplicate successful payment for same ride
        const alreadyPaid = await Payment.findOne({
            rideId,
            status: "paid"
        });

        if (alreadyPaid) {
            // Duplicate payment (refund this one)
            await razorpay.payments.refund(razorpay_payment_id);

            return res.json({
                success: true,
                message: "Duplicate payment detected, refunded"
            });
        }

        if (payment.status === "paid") {
            return res.json({ success: true });
        }

        // update payment
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.status = "paid";
        await payment.save();

        // update ride
        ride.status = "completed";
        await ride.save();

        // update captain
        await Captain.findByIdAndUpdate(ride.captain, {
            status: "active",
        });

        // SOCKET EMIT
        const room = `chat:${rideId}`;

        req.app.get("io").to(room).emit("ride:completed", {
            rideId,
        });

        // disconnect chat
        req.app.get("io").socketsLeave(room);

        return res.json({ success: true });

    } catch (err) {
        console.log("verify error:", err.message);
        res.status(500).json({ message: "Payment verification failed" });
    }
};


module.exports = { createOrder, verifyPayment };