import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { CAPTAIN_RIDE_REQUEST_ACTION_TYPES } from "../../reducers/captainRideRequestReducer.js";
import socket from "../../socket.js";
import { SOCKET_EVENTS } from "../../constants.js";
import { SHARED_ACTION_TYPES } from "../../reducers/sharedReducer.js";

const RideDetails = () => {
    const acceptedRide = useSelector(state => state.captainRideRequest.acceptedRide);
    const dispatch = useDispatch();
    const isOtpVerified = useSelector(state => state.captainRideRequest?.acceptedRide?.ride?.otpVerified);

    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputsRef = useRef([]);

    if (!acceptedRide) return null;

    const { pickupName, dropName, ride, name } = acceptedRide;

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // ✅ SOCKET LISTENERS (FIXED)
    useEffect(() => {
        const handleOtpVerified = ({ rideId }) => {
            if (!rideId) return;

            if (acceptedRide?.ride?._id !== rideId) return;

            dispatch({
                type: CAPTAIN_RIDE_REQUEST_ACTION_TYPES.VERIFY_OTP,
                payload: {
                    ...acceptedRide,
                    ride: {
                        ...acceptedRide.ride,
                        otpVerified: true,
                        status: "ongoing",
                    },
                },
            });
        };

        const handleRideError = (err) => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: err.message || "Something went wrong",
            });
        };

        socket.on(SOCKET_EVENTS.OTP_VERIFIED, handleOtpVerified);
        socket.on(SOCKET_EVENTS.RIDE_ERROR, handleRideError);

        return () => {
            socket.off(SOCKET_EVENTS.OTP_VERIFIED, handleOtpVerified);
            socket.off(SOCKET_EVENTS.RIDE_ERROR, handleRideError);
        };
    }, [acceptedRide, dispatch]);

    // START RIDE
    const handleStartRide = () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 4) {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Enter valid OTP",
            });
            return;
        }

        socket.emit(SOCKET_EVENTS.OTP_VERIFY, {
            rideId: acceptedRide.ride._id,
            otp: enteredOtp,
        });
    };

    return (
        <div className="w-full md:w-[420px] mx-auto bg-black p-[2px] rounded-2xl shadow-lg">
            <div className="bg-white rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                    <FaUserCircle size={40} className="text-gray-400" />
                    <div>
                        <p className="text-sm text-gray-500">Passenger</p>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {name}
                        </h2>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4 text-sm">

                    <div className="flex gap-3 items-start">
                        <IoLocationSharp className="text-green-500 mt-1" />
                        <div>
                            <p className="text-gray-400 text-xs">Pickup</p>
                            <p className="font-medium text-gray-800">
                                {pickupName}
                            </p>
                        </div>
                    </div>

                    <div className="border-l-2 border-dashed border-gray-300 ml-[9px] h-4" />

                    <div className="flex gap-3 items-start">
                        <IoLocationSharp className="text-red-500 mt-1" />
                        <div>
                            <p className="text-gray-400 text-xs">Drop</p>
                            <p className="font-medium text-gray-800">
                                {dropName}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-gray-100">
                        <div>
                            <p className="text-gray-400 text-xs">Vehicle</p>
                            <p className="font-medium text-gray-800">
                                {ride.vehicleType}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-gray-400 text-xs">Fare</p>
                            <p className="font-semibold text-lg text-black">
                                ₹{ride.fare}
                            </p>
                        </div>
                    </div>

                    {/* OTP / Ride Actions */}
                    <div className="pt-4 border-t border-gray-100 space-y-3">

                        {!isOtpVerified ? (
                            <>
                                <p className="text-sm font-medium text-gray-700">
                                    Enter OTP to start ride
                                </p>

                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputsRef.current[index] = el)}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) =>
                                                handleChange(e.target.value, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                            className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleStartRide}
                                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                                >
                                    Start Ride
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-green-600 font-medium text-center">
                                    Ride started successfully
                                </p>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default RideDetails;