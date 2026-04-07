import {useSelector} from "react-redux";
import UserHeader from "./UserHeader.jsx";
import MapView from "./MapView.jsx";
import RideFlow from "./Ride/RideFlow.jsx";
import SearchingCaptains from "./SearchingCaptains.jsx";
import useUserSocket from "./userHooks/useUserSocket.js";
import useUserLocation from "./userHooks/useUserLocation.js";

const UserDashboard = () => {
    const rideStatus = useSelector(state => state.userRide.rideStatus);

    useUserSocket();
    useUserLocation();


    return (
        <div className="flex flex-col h-screen w-full">
            <UserHeader />
            <div className="flex mt-3 flex-col md:flex-row flex-1 w-full overflow-y-auto md:overflow-hidden">
                <RideFlow />
                <div className="p-4 flex-1 min-h-[300px] md:min-h-0">
                    <MapView />
                </div>
                {rideStatus === "searching" && <SearchingCaptains />}
            </div>
        </div>
    );
};

export default UserDashboard;