const SOCKET_EVENTS = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    JOIN: "join",
    RIDE_REQUEST: "ride:request",
    RIDE_CREATED: "ride:created",
    RIDE_ACCEPT: "ride:accept",
    RIDE_ACCEPTED: "ride:accepted",
    RIDE_FAILED: "ride:failed",
    RIDE_CANCEL: "ride:cancel",
    RIDE_CANCELLED: "ride:cancelled",
    CAPTAIN_LOCATION: "captain:location",
    JOIN_RIDE_CHAT: "chat:join",
    SEND_MESSAGE: "chat:send",
    RECEIVE_MESSAGE: "chat:receive",
    CHAT_MESSAGE: "chat:message",
    CHAT: "chat:init",
    OTP_VERIFY: "ride:otp:verify",
    OTP_VERIFIED: "ride:otp:verified",
    RIDE_STARTED: "ride:started",
};

module.exports = { SOCKET_EVENTS };