const {SOCKET_EVENTS} = require("../sockets.events");

const emitRideRequest = (io, captainId, payload) => {
    io.to(`captain:${captainId}`).emit(SOCKET_EVENTS.RIDE_REQUEST, payload);
};

const emitRideAcceptedToUser = (io, userId, payload) => {
    io.to(`user:${userId}`).emit(SOCKET_EVENTS.RIDE_ACCEPTED, payload);
};

const emitRideFailed = (socket, message) => {
    socket.emit(SOCKET_EVENTS.RIDE_FAILED, { message });
};

module.exports = {emitRideRequest, emitRideAcceptedToUser, emitRideFailed,};