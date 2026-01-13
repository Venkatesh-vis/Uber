import React from "react";
import { motion } from "framer-motion";

const CaptainWelcome = () => {
    return (
        <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white font-bold max-w-md"
        >
            <p className="text-sm sm:text-base opacity-90">
                Driving with Uber gives you the freedom to earn on your own terms. Whether you want a full-time income or
                a flexible side hustle, Uber lets you choose when and how often you drive. Go online whenever it suits
                you and accept trips that fit your schedule.
                <br /><br />
                Captains get clear trip details, upfront earnings visibility, and built-in navigation to help drive
                efficiently. Secure payments, safety features, and reliable support make every ride simple and
                stress-free. Turn your vehicle into an earning opportunity and join a growing community of captains who
                value independence, flexibility, and control.
            </p>
        </motion.div>
    );
};

export default CaptainWelcome;
