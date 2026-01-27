import { useState } from "react";
import UserHeader from "./UserHeader.jsx";
import RideOptions, {DUMMY_RIDES} from "./RideOptions.jsx";
import MapView from "./MapView.jsx";
import RideSearchPanel from "./RideSearchPanel .jsx";
import {useDispatch} from "react-redux";
import {SHARED_ACTION_TYPES} from "../../reducers/sharedReducer.js";

const UserDashboard = () => {
    const [trip, setTrip] = useState({
        pickup: "",
        drop: "",
        searched: false,
        selectedRide: null,
    });
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (!trip.pickup || !trip.drop) {
            dispatch({type: SHARED_ACTION_TYPES.SET_MESSAGE, payload: "Please enter both pickup and drop-off locations."});
            return;
        }

        setTrip((prev) => ({
            ...prev,
            searched: true,
            selectedRide: DUMMY_RIDES[0],
        }));
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <UserHeader />
            <div className="flex mt-3 flex-col md:flex-row flex-1 w-full overflow-y-auto md:overflow-hidden">
                <div className="w-full md:w-[380px] bg-transparent">
                    <RideSearchPanel
                        trip={trip}
                        setTrip={setTrip}
                        onSearch={handleSearch}
                    />
                </div>
                {trip.searched && (
                    <div className="w-full md:w-[420px] bg-white">
                        <RideOptions
                            selectedRide={trip.selectedRide}
                            onSelectRide={(ride) =>
                                setTrip(prev => ({ ...prev, selectedRide: ride }))
                            }
                        />
                    </div>
                )}
                <div className="p-4 ml-5 flex-1 min-h-[300px] md:min-h-0">
                    <MapView trip={trip} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
