const { Server } = require("socket.io");
const Captain = require("./models/captain.model");
const User = require("./models/user.model");

module.exports = function (server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:8000",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New socket connected:", socket.id);

        socket.on("captain-online", async ({ captainId }) => {
            await Captain.findByIdAndUpdate(captainId, {
                socketId: socket.id,
                status: "active",
            });
        });

        // Captain location updates
        socket.on("captain-location-update", async ({ captainId, lat, lng }) => {
            await Captain.findByIdAndUpdate(captainId, {
                location: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
            });
        });

        // User connects
        socket.on("user-online", async ({ userId }) => {
            await User.findByIdAndUpdate(userId, {
                socketId: socket.id,
            });
        });

        socket.on("disconnect", async () => {
            await Captain.findOneAndUpdate(
                { socketId: socket.id },
                { status: "inactive", socketId: null }
            );

            await User.findOneAndUpdate(
                { socketId: socket.id },
                { socketId: null }
            );
        });
    });

    return io;
};