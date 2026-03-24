import React from "react";
import {useSelector} from "react-redux";
import socket from "../../socket.js";

const PaymentBar = ({ ride }) => {
    const userRide = useSelector(state => state.userRide);
    const user = useSelector(state => state.user);

    const handleRequestRide = () => {
        if (!ride || !userRide || !user?._id) return;

        const rideRequest = {
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
        }

        socket.emit("ride:request", rideRequest);

        console.log("Ride request sent", rideRequest);
    };


    return (
        <div className="sticky bottom-4 px-4">
            <div className="bg-white rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">

                <button
                    onClick={handleRequestRide}
                    className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg font-medium w-full whitespace-nowrap"
                >
                    Request {ride?.name}
                </button>


            </div>
        </div>
    );
};

export default PaymentBar;