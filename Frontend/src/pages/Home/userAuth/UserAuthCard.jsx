import { useState } from "react";
import { motion } from "framer-motion";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup.jsx";

const UserAuthCard = () => {
    const [mode, setMode] = useState("signup");

    return (
        <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{once: false}}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {mode === "signup" ? (
                <UserSignup onSwitch={() => setMode("login")} />
            ) : (
                <UserLogin onSwitch={() => setMode("signup")} />
            )}
        </motion.div>
    );
};

export default UserAuthCard;
