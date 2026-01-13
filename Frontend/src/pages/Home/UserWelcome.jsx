import React from "react";
import {motion} from "framer-motion";

const UserWelcome = () => {
    return (
        <motion.div
            initial={{x: -120, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1, ease: "easeOut"}}
            className="text-white font-bold max-w-md"
        >
            <p className="text-sm sm:text-base opacity-90">
                Uber helps you move around your city with ease, reliability, and control. Whether you’re heading to
                work, meeting friends, or exploring somewhere new, Uber connects you with safe and affordable rides in
                minutes. Just open the app, choose your destination, and get moving. With real-time tracking, upfront
                pricing, and trusted drivers, every ride is designed to be simple and stress-free. From everyday
                commutes to late-night trips, Uber is built to fit your life. Sign up today and experience a smarter,
                faster way to travel—whenever and wherever you need to go.
            </p>
        </motion.div>
    );
};

export default UserWelcome;
