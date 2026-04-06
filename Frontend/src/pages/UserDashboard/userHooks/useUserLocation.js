import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {USER_RIDE_ACTION_TYPES} from "../../../reducers/userRideReducer.js";
import {getCurrentCity} from "../../../utils.js";
import {SHARED_ACTION_TYPES} from "../../../reducers/sharedReducer.js";


const useUserLocation = () => {
    const dispatch = useDispatch();

    const handleLocationSuccess = useCallback(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const city = await getCurrentCity(lat, lon);

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_USER_LOCATION,
            payload: [lat, lon],
        });

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_USER_CITY,
            payload: city,
        });
    }, []);

    const handleLocationError = useCallback(() => {
        dispatch({
            type: SHARED_ACTION_TYPES.SET_MESSAGE,
            payload: "Location permission denied."
        });
    }, []);

    const requestUserLocation = useCallback(() => {
        if (!navigator.geolocation) {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Geolocation not supported."
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            handleLocationSuccess,
            handleLocationError,
            { enableHighAccuracy: true }
        );
    }, [handleLocationSuccess, handleLocationError]);

    useEffect(() => {
        requestUserLocation();
    }, [requestUserLocation]);
};

export default useUserLocation;