import { useEffect, useState, useRef } from "react";
import socket from "../../../socket.js";
import { SOCKET_EVENTS } from "../../../constants.js";

const useChatSocket = (rideId, userId) => {
    const [messages, setMessages] = useState([]);
    const joinedRef = useRef(false);

    useEffect(() => {
        if (!rideId) return;

        if (!joinedRef.current) {
            socket.emit(SOCKET_EVENTS.JOIN_RIDE_CHAT, { rideId });
            joinedRef.current = true;
        }

        const handleMessage = (msg) => {
            setMessages((prev) => {
                const exists = prev.find((m) => m.id === msg.id);
                if (exists) return prev;
                return [...prev, msg];
            });
        };

        socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleMessage);

        return () => {
            socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleMessage);
            joinedRef.current = false;
        };
    }, [rideId]);

    const sendMessage = (text) => {
        if (!text || !rideId) return;

        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
            rideId,
            message: text,
        });

    };

    return { messages, sendMessage };
};

export default useChatSocket;