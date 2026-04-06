import React from "react";
import {useDispatch, useSelector} from "react-redux";
import socket from "../../../socket.js";
import {USER_RIDE_ACTION_TYPES} from "../../../reducers/userRideReducer.js";
import {SOCKET_EVENTS} from "../../../constants.js";

const RideRequest = ({ ride }) => {
    const userRide = useSelector(state => state.userRide);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    const handleRequestRide = () => {
        if (!ride || !userRide || !user?._id) return;

        if (userRide.rideStatus !== "idle") return;

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_RIDE_STATUS,
            payload: "searching",
        });

        const reqData = {
            userId: user._id,
            pickup: {
                lat: userRide.pickupCoords[1],
                lng: userRide.pickupCoords[0],
            },
            drop: {
                lat: userRide.dropCoords[1],
                lng: userRide.dropCoords[0],
            },
            vehicleType: ride.vehicleType,
            pickupAddressName:userRide.pickup,
            dropAddressName:userRide.drop,
            userName: user.fullname.firstname + " " + user.fullname.lastname,
        }

        socket.emit(SOCKET_EVENTS.RIDE_REQUEST, reqData);
    };

    return (
        <div className="sticky bottom-4 px-4">
            <div className="bg-white rounded-xl p-4 shadow">

                <button
                    onClick={handleRequestRide}
                    disabled={userRide.rideStatus !== "idle"}
                    className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg w-full"
                >
                    Request {ride?.name}
                </button>

            </div>
        </div>
    );
};

export default RideRequest;