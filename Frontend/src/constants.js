export const API_BASE_URL = import.meta.env.VITE_BASE_URL

export const REACT_APP_RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID ;

export const REQUEST_METHOD = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PUT: "PUT"
};

//socket events
export const SOCKET_EVENTS = {
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
    OTP_VERIFY: "ride:otp:verify",
    OTP_VERIFIED: "ride:otp:verified",
    RIDE_STARTED: "ride:started",
    RIDE_ERROR: "ride:error",
    RIDE_COMPLETED: "ride:completed",
};

