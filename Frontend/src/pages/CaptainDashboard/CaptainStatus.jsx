import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCaptainStatus } from "../../api/captain/captain-api.js";
import { CAPTAIN_ACTION_TYPES } from "../../reducers/captainReducer.js";

const CaptainStatus = () => {
    const captain = useSelector((state) => state.captain);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const toggleStatus = () => {
        const newStatus =
            captain.status === "active" ? "inactive" : "active";

        const reqBody = {
            status: newStatus,
        };

        const successFunction = (response) => {
            dispatch({
                type: CAPTAIN_ACTION_TYPES.SET_CAPTAIN,
                payload: response.captain,
            });
            setLoading(false);
        };

        const failureFunction = (error) => {
            console.error("Failed to update status", error);
            setLoading(false);
        };

        setLoading(true);
        updateCaptainStatus(successFunction, failureFunction, reqBody);
    };

    if (!captain) return null;

    return (
        <div className="flex items-center gap-4 p-4">
            <button
                onClick={toggleStatus}
                disabled={loading}
                className={`relative w-14 h-7 cursor-pointer flex items-center rounded-full transition-colors duration-300 ${
                    captain.status === "active"
                        ? "bg-green-500"
                        : "bg-gray-400"
                }`}
            >
                <span
                    className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        captain.status === "active"
                            ? "translate-x-7"
                            : ""
                    }`}
                />
            </button>

            <p className="text-lg font-semibold">
                {captain.status === "active"
                    ? "Go Offline"
                    : "Go Online"}
            </p>
        </div>
    );
};

export default CaptainStatus;