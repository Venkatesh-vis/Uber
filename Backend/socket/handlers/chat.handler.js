const { SOCKET_EVENTS } = require("../sockets.events");
const Ride = require("../../models/ride.model");

const registerChatHandlers = (io, socket) => {

    // ✅ JOIN CHAT ROOM
    socket.on(SOCKET_EVENTS.JOIN_RIDE_CHAT, async ({ rideId }) => {
        if (!rideId) return;

        const ride = await Ride.findById(rideId);

        if (!ride) {
            console.log("❌ Ride not found");
            return;
        }

        const isAuthorized =
            ride.user.toString() === socket.userId ||
            ride.captain?.toString() === socket.userId;

        if (!isAuthorized) {
            console.log("❌ Unauthorized chat join attempt");
            return;
        }

        const room = `chat:${rideId}`;

        socket.join(room);

        console.log("✅ JOIN_RIDE_CHAT");
        console.log("Socket:", socket.id);
        console.log("User:", socket.userId);
        console.log("Joined room:", room);
        console.log("All rooms:", socket.rooms);
    });

    // ✅ SEND MESSAGE
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, ({ rideId, message }) => {
        if (!rideId || !message) return;

        const room = `chat:${rideId}`; // 🔥 FIXED

        console.log("📩 MESSAGE RECEIVED");
        console.log("From:", socket.userId);
        console.log("Room:", room);
        console.log("Message:", message);


        const usersInRoom = io.sockets.adapter.rooms.get(room);
        console.log("👥 Users in room:", usersInRoom ? [...usersInRoom] : "NONE");

        // ✅ EMIT TO ROOM (sender + receiver both)
        io.to(room).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, {
            id: Date.now(),
            text: message,
            senderId: socket.userId,
            timestamp: new Date(),
        });

        console.log("📡 MESSAGE EMITTED");
    });
};

module.exports = registerChatHandlers;