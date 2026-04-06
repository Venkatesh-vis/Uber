import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import CaptainLogin from "./CaptainLogin";
import CaptainSignup from "./CaptainSignup";

const CaptainAuthCard = () => {
    const [mode, setMode] = useState("login");

    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLocation({
                    lat: latitude,
                    lng: longitude,
                });
            },
            (error) => {
                setLocationError(error.message);
            }
        );
    }, []);

    return (
        <motion.div
            className="w-full flex justify-center"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {mode === "login" ? (
                <CaptainLogin location={location}
                              locationError={locationError}
                              onSwitch={() => setMode("signup")} />
            ) : (
                <CaptainSignup
                    location={location}
                    locationError={locationError}
                    onSwitch={() => setMode("login")} />
            )}
        </motion.div>
    );
};

export default CaptainAuthCard;
