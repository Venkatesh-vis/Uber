import { FaUserCircle } from "react-icons/fa";
import {useSelector} from "react-redux";
import ExpandableText from "../../../shared/ExpandableText.jsx";
import MakePaymentButton from "../MakePaymentButton.jsx";

const RideCaptainDetails = () => {
    const captainDetails = useSelector(state => state.userRide.captainDetails);
    const pickup = useSelector(state => state.userRide?.pickup);
    const drop = useSelector(state => state.userRide?.drop);
    const rideOngoing = useSelector(state => state.userRide.rideOngoing);


    return (
        <div className="w-full md:w-[420px] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-[1px] shadow-xl">

            <div className="bg-white rounded-3xl overflow-hidden border border-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

                <div className="flex items-center gap-3 p-5 border-b border-gray-100">
                    <FaUserCircle size={42} className="text-gray-400" />

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {captainDetails?.captain.name}
                        </h2>
                        <p className="text-xs text-gray-500">
                            Captain
                        </p>
                    </div>
                </div>

                <div className="p-5 space-y-4 text-sm">

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Vehicle</span>
                        <span className="font-medium text-gray-800">
                            {captainDetails?.captain.vehicleNumber}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Pickup</span>
                        <ExpandableText text={pickup}/>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Drop</span>
                        <ExpandableText text={drop}/>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-400">Fare</span>
                        <span className="font-semibold text-lg text-black">
                            ₹{captainDetails?.fare}
                        </span>
                    </div>

                    <div className="pt-4 border-t border-gray-100 text-center space-y-2">
                        <p className="text-gray-500 text-xs">
                            Share this OTP with captain to start ride
                        </p>

                        <p className="text-[11px] text-yellow-500 font-medium">
                            Do not share until captain arrives at pickup location
                        </p>

                        <div className="flex justify-center gap-2">
                            {captainDetails?.otp?.split("").map((digit, index) => (
                                <div
                                    key={index}
                                    className="w-10 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-lg font-semibold text-gray-900">
                                    {digit}
                                </div>
                            ))}
                        </div>

                        {rideOngoing &&
                            <div className="flex justify-center">
                                <MakePaymentButton />
                            </div>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideCaptainDetails;