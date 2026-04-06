import { io } from "socket.io-client";

const socket = io("https://uber-cb54.onrender.com", {
    autoConnect: false,
    withCredentials: true
});

export default socket;