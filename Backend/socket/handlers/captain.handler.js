const Captain = require("../../models/Captain.model");
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

            console.log(`Updated location for captain ${captainId}`);
        } catch (err) {
            console.log("location error:", err.message);
        }
    });
};

module.exports = registerCaptainHandlers;