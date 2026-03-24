import React, { useEffect } from 'react';
import CaptainStatus from "./CaptainStatus.jsx";
import CaptainHeader from "./CaptainHeader.jsx";
import socket from "../../socket.js";
import { useSelector } from "react-redux";

const CaptainDashboard = () => {

    const captain = useSelector(state => state.captain);

    useEffect(() => {
        if (!captain?._id) return;
        if (socket.connected) return;

        if (!socket.connected) {
            socket.connect();
        }

        const handleConnect = () => {
            console.log("Captain connected:", socket.id);

            socket.emit("join", {
                userId: captain._id,
                role: "captain",
            });
        };

        socket.on("connect", handleConnect);

        // Send live location
        const sendLocation = () => {
            if (!navigator.geolocation) return;

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;

                    socket.emit("captain:location", {
                        captainId: captain._id,
                        lat: latitude,
                        lng: longitude,
                    });

                    console.log("Location sent:", latitude, longitude);
                },
                (err) => {
                    console.log("Location error:", err.message);
                }
            );
        };

        // send every 30 seconds
        const interval = setInterval(sendLocation, 30000);

        sendLocation();

        return () => {
            socket.off("connect", handleConnect);
            clearInterval(interval);
        };

    }, [captain?._id]);

    return (
        <>
            <CaptainHeader />
            <CaptainStatus />
        </>
    );
};

export default CaptainDashboard;