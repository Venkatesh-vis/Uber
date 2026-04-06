import RideCaptainDetails from "./Ride/RideCaptainDetails.jsx";
import UserChat from "./UserChat.jsx";
import {useSelector} from "react-redux";


const CaptainAssigned = () => {
    const rideOngoing = useSelector(state => state.userRide.rideOngoing);

    return (
        <>
            <RideCaptainDetails />
            {!rideOngoing && <UserChat />}
        </>
    )
}

export default CaptainAssigned;