const http = require("http");
const app = require("./app");
const socketInit = require("./socket");
const registerRideEvents = require("./events/ride.events");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketInit(server);

registerRideEvents(io);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});