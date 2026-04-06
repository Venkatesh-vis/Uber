import React from "react";

const RideNotificationCard = ({ ride, onAccept, onReject }) => {
    return (
        <div className="w-80 bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                    {ride.userName.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-800">
                        {ride.userName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                        {ride.vehicleType}
                    </p>
                </div>
            </div>

            <div className="mb-4">

                <div className="flex items-start gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1.5"></span>
                    <p className="text-xs text-gray-700 leading-tight">
                        {ride.pickupAddressName}
                    </p>
                </div>

                <div className="ml-[5px] h-5 border-l-2 border-dashed border-gray-300 my-1"></div>

                <div className="flex items-start gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full mt-1.5"></span>
                    <p className="text-xs text-gray-700 leading-tight">
                        {ride.dropAddressName}
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onReject(ride.rideId)}
                    className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                    Reject
                </button>

                <button
                    onClick={() => onAccept(ride.rideId)}
                    className="flex-1 py-2 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RideNotificationCard;