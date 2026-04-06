import { useSelector } from "react-redux";
import RideSearchPanel from "../RideSearchPanel.jsx";
import RideOptions from "./RideOptions.jsx";
import CaptainAssigned from "../CaptainAssigned.jsx";

const RideFlow = () => {
    const rideStatus = useSelector(state => state.userRide.rideStatus);
    const loading = useSelector(state => state.userRide.loading);
    const rideOptions = useSelector(state => state.userRide.rideOptions);

    if (rideStatus === "assigned") {
        return <CaptainAssigned />;
    }

    return (
        <>
            <div className="w-full md:w-[380px]">
                <RideSearchPanel />
            </div>
            {(loading || rideOptions?.length > 0) && (
                <div className="w-full md:w-[420px] bg-white">
                    <RideOptions />
                </div>
            )}
        </>
    );
};

export default RideFlow;