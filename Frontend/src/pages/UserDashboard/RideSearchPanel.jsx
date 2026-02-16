import {useDispatch, useSelector} from "react-redux";
import LocationInputs from "./LocationInputs";
import {SHARED_ACTION_TYPES} from "../../reducers/sharedReducer.js";
import {USER_RIDE_ACTION_TYPES} from "../../reducers/userRideReducer.js";
import {DUMMY_RIDES} from "./RideOptions.jsx";

const RideSearchPanel = () => {
    const trip = useSelector(state => state.userRide);
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (!trip.pickupCoords || !trip.dropCoords) {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Please select pickup and drop locations from list."
            });
            return;
        }

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_SEARCHED,
            payload: true,
        });

        dispatch({
            type: USER_RIDE_ACTION_TYPES.SET_SELECTED_RIDE,
            payload: DUMMY_RIDES[0],
        });
    };

    return (
        <div className="h-fit md:h-full p-4">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
                <LocationInputs />

                {!trip.searched && (
                    <button
                        onClick={handleSearch}
                        className="bg-black cursor-pointer text-white py-3 rounded-lg font-medium"
                    >
                        Search
                    </button>
                )}
            </div>
        </div>
    );
};

export default RideSearchPanel;
