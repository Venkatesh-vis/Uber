import { useState } from "react";
import { motion } from "framer-motion";
import CaptainLogin from "./CaptainLogin";
import CaptainSignup from "./CaptainSignup";

const CaptainAuthCard = () => {
    const [mode, setMode] = useState("login");

    return (
        <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {mode === "login" ? (
                <CaptainLogin onSwitch={() => setMode("signup")} />
            ) : (
                <CaptainSignup onSwitch={() => setMode("login")} />
            )}
        </motion.div>
    );
};

export default CaptainAuthCard;
