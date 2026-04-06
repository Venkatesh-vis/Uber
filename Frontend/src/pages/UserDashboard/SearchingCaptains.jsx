import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {USER_RIDE_ACTION_TYPES} from "../../reducers/userRideReducer";
import {AnimatePresence, motion} from "framer-motion";
import socket from "../../socket.js";
import {SOCKET_EVENTS} from "../../constants.js";

const SearchingCaptains = () => {
    const dispatch = useDispatch();
    const ride = useSelector(state => state.userRide);

    const formatAddress = (address) => {
        if (!address) return "N/A";
        return address.split(",").slice(0, 2).join(", ").trim();
    };

    useEffect(() => {
        if (ride?.rideStatus === "searching") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [ride?.rideStatus]);

    if (ride?.rideStatus !== "searching") return null;

    const handleCancel = () => {
        if (!ride?.currentRideId) return;

        socket.emit(SOCKET_EVENTS.RIDE_CANCEL, {
            rideId: ride.currentRideId,
        });

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_RIDE_STATUS,
            payload: "idle",
        });

    };

    return (
        <AnimatePresence>
                <div className="fixed inset-0 z-[9999]">

                    <motion.div
                        className="absolute inset-0 bg-black/30 z-[9998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    <div className="absolute inset-0 z-[9999] flex items-end justify-center md:items-center">

                        <motion.div
                            className="w-full md:w-[420px] bg-white rounded-t-2xl md:rounded-2xl shadow-lg p-4"

                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}

                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                            }}
                        >

                            <div className="relative w-full h-1 bg-gray-200 overflow-hidden rounded mb-4">
                                <div className="absolute top-0 left-0 h-full w-1/3 bg-black animate-loader" />
                            </div>

                            <h3 className="text-lg font-semibold mb-2">
                                Searching for captains...
                            </h3>

                            <p className="text-sm text-gray-500 mb-4">
                                Finding nearby drivers for your ride
                            </p>

                            <div className="space-y-3 text-sm text-gray-700 mb-4">

                                <div className="grid grid-cols-[90px_1fr]">
                                    <span className="font-medium text-gray-500">Pickup</span>
                                    <span
                                        className="truncate min-w-0"
                                        title={ride?.pickup}
                                    >
                                        : {formatAddress(ride?.pickup)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-[90px_1fr]">
                                    <span className="font-medium text-gray-500">Drop</span>
                                    <span
                                        className="truncate min-w-0"
                                        title={ride?.drop}
                                    >
                                        : {formatAddress(ride?.drop)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-[90px_1fr]">
                                    <span className="font-medium text-gray-500">Vehicle</span>
                                    <span>
                                        {ride?.selectedRide?.name
                                            ? `: ${ride.selectedRide.name}`
                                            : "N/A"}
                                    </span>
                                </div>

                            </div>

                            <button
                                onClick={handleCancel}
                                className="w-full cursor-pointer bg-red-500 text-white py-2 rounded-lg font-medium"
                            >
                                Cancel Ride
                            </button>

                        </motion.div>
                    </div>
                </div>
        </AnimatePresence>
    );
};

export default SearchingCaptains;