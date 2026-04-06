import RideDetails from "./RideDetails.jsx";
import CaptainChat from "./CaptainChat.jsx";
import {useSelector} from "react-redux";


const BusyCaptain = () => {
    const isOtpVerified = useSelector(state => state.captainRideRequest?.acceptedRide?.ride?.otpVerified);

    return (
        <>
            <RideDetails />
            {!isOtpVerified && <CaptainChat />}
        </>
    )
}

export default BusyCaptain;