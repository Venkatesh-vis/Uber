import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCircle, FaSquare } from "react-icons/fa";
import { searchLocations } from "../../utils.js";
import { USER_RIDE_ACTION_TYPES } from "../../reducers/userRideReducer.js";
import SearchedLocationCard from "./LocationSearchList.jsx";

const LocationInputs = () => {
    const dispatch = useDispatch();
    const trip = useSelector(state => state.userRide);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeField, setActiveField] = useState(null);

    const query = activeField === "pickup" ? trip.pickup : activeField === "drop" ? trip.drop : null;

    useEffect(() => {
        if (!query || !trip.userCity) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            const data = await searchLocations(query, trip.userCity);
            setResults(data);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [query, trip.userCity]);

    const handleSelect = (location) => {
        if (activeField === "pickup") {
            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_PICKUP,
                payload: location.name,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_PICKUP_COORDS,
                payload: location.coordinates,
            });
        } else if (activeField === "drop") {
            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_DROP,
                payload: location.name,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_DROP_COORDS,
                payload: location.coordinates,
            });
        }

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_SEARCHED,
            payload: false,
        });

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_SELECTED_RIDE,
            payload: null,
        });

        setResults([]);
        setActiveField(null);
    };

    const handleChange = (field, value) => {
        setActiveField(field);

        if (field === "pickup") {
            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_PICKUP,
                payload: value,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_PICKUP_COORDS,
                payload: null,
            });
        }
        else {
            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_DROP,
                payload: value,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_DROP_COORDS,
                payload: null,
            });
        }

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_SEARCHED,
            payload: false,
        });

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_SELECTED_RIDE,
            payload: null,
        });
    };

    return (
        <div className="bg-white rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold">Find a trip</h2>

            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                <FaCircle className="text-black text-xs" />
                <input
                    type="text"
                    placeholder="Pickup location"
                    value={trip.pickup}
                    onChange={(e) =>
                        handleChange("pickup", e.target.value)
                    }
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                <FaSquare className="text-black text-xs" />
                <input
                    type="text"
                    placeholder="Drop-off location"
                    value={trip.drop}
                    onChange={(e) =>
                        handleChange("drop", e.target.value)
                    }
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {activeField && (
                <div className="space-y-2">
                    {loading && (
                        <p className="text-sm text-gray-500 px-2">
                            Searching locations…
                        </p>
                    )}

                    {results.map(location => (
                        <SearchedLocationCard
                            key={location.id}
                            label={location.name}
                            onSelect={() => handleSelect(location)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationInputs;
