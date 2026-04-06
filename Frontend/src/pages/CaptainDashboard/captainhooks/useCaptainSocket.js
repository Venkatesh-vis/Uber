import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socket.js";
import { SOCKET_EVENTS } from "../../../constants.js";
import { CAPTAIN_RIDE_REQUEST_ACTION_TYPES } from "../../../reducers/captainRideRequestReducer.js";
import { CAPTAIN_ACTION_TYPES } from "../../../reducers/captainReducer.js";
import { getPlaceName } from "../../../utils.js";

const useCaptainSocket = () => {
    const dispatch = useDispatch();
    const captain = useSelector(state => state.captain);
    const rideRequests = useSelector(state => state.captainRideRequest.rideRequests);


    // avoid stale state
    const rideRequestsRef = useRef(rideRequests);

    useEffect(() => {
        if (!captain?._id) return;

        if (!socket.connected) socket.connect();

        const handleConnect = () => {
            socket.emit(SOCKET_EVENTS.JOIN, {
                userId: captain._id,
                role: "captain",
            });
        };

        socket.on("connect", handleConnect);

        // NEW RIDE
        const handleRideRequest = (data) => {
            const current = rideRequestsRef.current || [];

            const exists = current.some(r => r.rideId === data.rideId);
            if (exists) return;

            dispatch({
                type: CAPTAIN_RIDE_REQUEST_ACTION_TYPES.SET_RIDE_REQUESTS,
                payload: [data, ...current],
            });
        };

        socket.on(SOCKET_EVENTS.RIDE_REQUEST, handleRideRequest);

        // CANCEL
        const handleRideCancelled = ({ rideId }) => {
            const current = rideRequestsRef.current || [];

            const updated = current.filter(r => r.rideId !== rideId);

            dispatch({
                type: CAPTAIN_RIDE_REQUEST_ACTION_TYPES.REMOVE_RIDE_REQUEST,
                payload: updated,
            });
        };

        socket.on(SOCKET_EVENTS.RIDE_CANCELLED, handleRideCancelled);

        // ACCEPTED
        const handleRideAccepted = async (data) => {
            const [pickupLng, pickupLat] = data.ride.pickup.coordinates;
            const [dropLng, dropLat] = data.ride.drop.coordinates;

            const pickupName = await getPlaceName(pickupLat, pickupLng);
            const dropName = await getPlaceName(dropLat, dropLng);

            dispatch({
                type: CAPTAIN_RIDE_REQUEST_ACTION_TYPES.CLEAR_RIDE_REQUESTS,
                payload: [],
            });

            dispatch({
                type: CAPTAIN_RIDE_REQUEST_ACTION_TYPES.ACCEPTED_REQUEST,
                payload: {
                    pickupName,
                    dropName,
                    ...data,
                },
            });

            dispatch({
                type: CAPTAIN_ACTION_TYPES.SET_CAPTAIN,
                payload: {
                    ...captain,
                    status: "busy",
                },
            });

            socket.emit(SOCKET_EVENTS.JOIN_RIDE_CHAT, {
                rideId: data.ride._id,
            });
        };

        socket.on(SOCKET_EVENTS.RIDE_ACCEPTED, handleRideAccepted);


        // LOCATION
        const sendLocation = () => {
            if (!navigator.geolocation) return;

            if (!["active", "busy"].includes(captain.status)) return;

            navigator.geolocation.getCurrentPosition((pos) => {
                socket.emit(SOCKET_EVENTS.CAPTAIN_LOCATION, {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            });
        };

        //ride completed
        const handleRideCompleted = ({ rideId }) => {

            if (rideId) {
                dispatch({
                    type: CAPTAIN_ACTION_TYPES.SET_CAPTAIN,
                    payload: {
                        ...captain,
                        status: "active",
                    },
                });

                dispatch({
                    type: CAPTAIN_RIDE_REQUEST_ACTION_TYPES.ACCEPTED_REQUEST,
                    payload: null,
                });
            }

        };

        socket.on(SOCKET_EVENTS.RIDE_COMPLETED, handleRideCompleted);

        const interval = setInterval(sendLocation, 30000);
        sendLocation();

        return () => {
            socket.off("connect", handleConnect);
            socket.off(SOCKET_EVENTS.RIDE_REQUEST, handleRideRequest);
            socket.off(SOCKET_EVENTS.RIDE_CANCELLED, handleRideCancelled);
            socket.off(SOCKET_EVENTS.RIDE_ACCEPTED, handleRideAccepted);
            socket.off(SOCKET_EVENTS.RIDE_COMPLETED, handleRideCompleted);
            clearInterval(interval);
        };

    }, [captain?._id]);

};

export default useCaptainSocket;