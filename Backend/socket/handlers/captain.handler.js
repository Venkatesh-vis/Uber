const Captain = require("../../models/captain.model");
const {SOCKET_EVENTS} = require("../sockets.events");

const registerCaptainHandlers = (socket) => {

    socket.on(SOCKET_EVENTS.CAPTAIN_LOCATION, async ({ captainId, lat, lng }) => {
        if (!captainId || !lat || !lng) return;

        try {
            await Captain.findByIdAndUpdate(captainId, {
                location: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
            });

        } catch (err) {
            console.log("location error:", err.message);
        }
    });
};

module.exports = registerCaptainHandlers;