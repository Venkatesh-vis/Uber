const { Server } = require("socket.io");
const registerRideHandlers = require("./handlers/ride.handler");
const registerCaptainHandlers = require("./handlers/captain.handler");
const registerChatHandlers = require("./handlers/chat.handler");
const {SOCKET_EVENTS} = require("./sockets.events");

let io;
let dev = true;

const initSocket = (server, app) => {
    const io = new Server(server, {
        cors: {
            origin: dev ? "http://localhost:8000" : "https://uber-three-pi.vercel.app",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    app.set("io", io);

    io.on(SOCKET_EVENTS.CONNECT, (socket) => {

        // join room
        socket.on(SOCKET_EVENTS.JOIN, ({ userId, role }) => {
            if (!userId || !role) return;

            socket.userId = userId;
            socket.role = role;

            const room = `${role}:${userId}`;

            socket.join(room);
        });

        // register modules
        registerRideHandlers(io, socket);
        registerCaptainHandlers(socket);
        registerChatHandlers(io, socket);

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket not initialized");
    return io;
};

module.exports = { initSocket, getIO };