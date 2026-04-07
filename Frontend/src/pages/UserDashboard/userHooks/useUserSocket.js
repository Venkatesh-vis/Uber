import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socket.js";
import { SOCKET_EVENTS } from "../../../constants.js";
import { USER_RIDE_ACTION_TYPES } from "../../../reducers/userRideReducer.js";
import {SHARED_ACTION_TYPES} from "../../../reducers/sharedReducer.js";

const useUserSocket = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rideState = useSelector(state => state.userRide);

    useEffect(() => {
        if (!user?._id) return;

        if (!socket.connected) socket.connect();

        const handleConnect = () => {
            socket.emit(SOCKET_EVENTS.JOIN, {
                userId: user._id,
                role: "user",
            });
        };

        socket.on("connect", handleConnect);

        return () => {
            socket.off("connect", handleConnect);
        };
    }, [user?._id]);

    useEffect(() => {
        const handleRideCreated = (data) => {
            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_CURRENT_RIDE_ID,
                payload: data.rideId,
            });
        };

        socket.on(SOCKET_EVENTS.RIDE_CREATED, handleRideCreated);

        return () => {
            socket.off(SOCKET_EVENTS.RIDE_CREATED, handleRideCreated);
        };
    }, []);

    useEffect(() => {
        const handleRideAccepted = (data) => {
            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_CAPTAIN_DETAILS,
                payload: data,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_RIDE_STATUS,
                payload: "assigned",
            });

            socket.emit(SOCKET_EVENTS.JOIN_RIDE_CHAT, {
                rideId: data.rideId,
            });
        };

        socket.on(SOCKET_EVENTS.RIDE_ACCEPTED, handleRideAccepted);

        return () => {
            socket.off(SOCKET_EVENTS.RIDE_ACCEPTED, handleRideAccepted);
        };
    }, []);


    useEffect(() => {

        const handleRideCompleted = ({ rideId }) => {

            if (rideState.currentRideId !== rideId) return;

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_RIDE_STATUS,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_CAPTAIN_DETAILS,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_CURRENT_RIDE_ID,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_RIDE_ONGOING,
                payload: false,
            });
        };

        socket.on(SOCKET_EVENTS.RIDE_COMPLETED, handleRideCompleted);

        return () => {
            socket.off(SOCKET_EVENTS.RIDE_COMPLETED, handleRideCompleted);
        };
    }, []);


    // OTP VERIFIED
    useEffect(() => {

        const handleOtpVerified = ({ rideId }) => {
            if (!rideId) return;

            if (rideState.currentRideId !== rideId) return;

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_CAPTAIN_DETAILS,
                payload: {
                    ...rideState.captainDetails,
                    otp: null,
                },
            });
        };

        const handleRideStarted = ({ rideId }) => {
            if (rideState.currentRideId !== rideId) return;

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_RIDE_ONGOING,
                payload: true,
            });
        };

        const handleRideError = (err) => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: err.message || "Something went wrong",
            });
        };



        socket.on(SOCKET_EVENTS.OTP_VERIFIED, handleOtpVerified);
        socket.on(SOCKET_EVENTS.RIDE_STARTED, handleRideStarted);
        socket.on(SOCKET_EVENTS.RIDE_ERROR, handleRideError);


        return () => {
            socket.off(SOCKET_EVENTS.OTP_VERIFIED, handleOtpVerified);
            socket.off(SOCKET_EVENTS.RIDE_STARTED, handleRideStarted);
            socket.off(SOCKET_EVENTS.RIDE_ERROR, handleRideError);
        };

    }, [rideState]);
};

export default useUserSocket;