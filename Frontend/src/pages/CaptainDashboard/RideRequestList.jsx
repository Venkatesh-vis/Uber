import {useSelector} from "react-redux";
import { motion } from "framer-motion";
import RideNotificationCard from "./RideNotificationCard.jsx";
import { useState } from "react";
import socket from "../../socket.js";
import { SOCKET_EVENTS } from "../../constants.js";

const RideRequestList = () => {
    const notifications = useSelector(state => state.captainRideRequest.rideRequests);
    const captain = useSelector(state => state.captain);
    const [removedRideIds, setRemovedRideIds] = useState([]);
    const rides = Array.isArray(notifications) ? notifications.filter(ride => !removedRideIds.includes(ride.rideId)) : [];

    const handleAction = (direction, ride) => {
        if (!ride || captain.status === "busy") return;

        navigator.vibrate?.(50);

        if (direction === "right") {
            socket.emit(SOCKET_EVENTS.RIDE_ACCEPT, {
                rideId: ride.rideId,
            });


        } else {
            setRemovedRideIds(prev => [...prev, ride.rideId]);
        }
    };


    return (
        <div className="flex flex-col items-center min-h-[400px]">

            <div className="mb-4 text-sm text-gray-500">
                Swipe <b>left</b> to Reject, <b>right</b> to Accept
            </div>

            <div className="relative w-80 h-[320px]">
                {rides.map((ride, index) => {
                    const isTop = index === 0;

                    return (
                        <motion.div
                            key={ride.rideId}
                            drag={isTop ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (!isTop) return;

                                if (info.offset.x > 50) {
                                    handleAction("right", ride);
                                } else if (info.offset.x < -50) {
                                    handleAction("left", ride);
                                }
                            }}
                            initial={{
                                scale: 1 - index * 0.05,
                                y: index * 12
                            }}
                            animate={{
                                scale: 1 - index * 0.05,
                                y: index * 12
                            }}
                            className="absolute w-full"
                            style={{ zIndex: rides.length - index }}
                        >
                            <RideNotificationCard
                                ride={ride}
                                onAccept={() => handleAction("right", ride)}
                                onReject={() => handleAction("left", ride)}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default RideRequestList;