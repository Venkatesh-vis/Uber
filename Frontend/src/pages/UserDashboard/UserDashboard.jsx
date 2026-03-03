import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserHeader from "./UserHeader.jsx";
import RideSearchPanel from "./RideSearchPanel.jsx";
import RideOptions from "./RideOptions.jsx";
import MapView from "./MapView.jsx";
import {SHARED_ACTION_TYPES} from "../../reducers/sharedReducer.js";
import {USER_RIDE_ACTION_TYPES} from "../../reducers/userRideReducer.js";
import {getCurrentCity} from "../../utils.js";


const UserDashboard = () => {
    const dispatch = useDispatch();
    const rideOptions = useSelector(state => state.userRide.rideOptions);
    const loading = useSelector(state => state.userRide.loading);

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
        navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, {enableHighAccuracy: true});
    }, [handleLocationSuccess, handleLocationError]);

    useEffect(() => {
        requestUserLocation();
    }, [requestUserLocation]);


    return (
        <div className="flex flex-col h-screen w-full">
            <UserHeader/>

            <div className="flex mt-3 flex-col md:flex-row flex-1 w-full overflow-y-auto md:overflow-hidden">

                <div className="w-full md:w-[380px]">
                    <RideSearchPanel/>
                </div>

                {(loading || (rideOptions && rideOptions.length > 0)) && (
                    <div className="w-full md:w-[420px] bg-white">
                        <RideOptions />
                    </div>
                )}


                <div className="p-4 flex-1 min-h-[300px] md:min-h-0">
                    <MapView/>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
