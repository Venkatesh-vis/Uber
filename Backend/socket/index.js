const { Server } = require("socket.io");
const registerRideHandlers = require("./handlers/ride.handler");
const registerCaptainHandlers = require("./handlers/captain.handler");
const {SOCKET_EVENTS} = require("./sockets.events");

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on(SOCKET_EVENTS.CONNECT, (socket) => {
        console.log("Socket connected:", socket.id);

        // join room
        socket.on(SOCKET_EVENTS.JOIN, ({ userId, role }) => {
            if (!userId || !role) return;

            const room = `${role}:${userId}`;

            if (!socket.rooms.has(room)) {
                socket.join(room);
                console.log(`Socket ${socket.id} joined ${room}`);
            }
        });

        // register modules
        registerRideHandlers(io, socket);
        registerCaptainHandlers(socket);

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