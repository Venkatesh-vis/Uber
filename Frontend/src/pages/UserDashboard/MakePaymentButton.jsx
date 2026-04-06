import { FiArrowUpRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { SHARED_ACTION_TYPES } from "../../reducers/sharedReducer";
import {REACT_APP_RAZORPAY_KEY, SOCKET_EVENTS} from "../../constants";
import socket from "../../socket";
import {makePayment, verifyPayment} from "../../api/user/user-api.js";
import {USER_RIDE_ACTION_TYPES} from "../../reducers/userRideReducer.js";

const MakePaymentButton = () => {
    const dispatch = useDispatch();
    const rideId = useSelector(state => state.userRide.currentRideId);

    const handlePayment = () => {
        if (!rideId) return;

        const successFunction = (data) => {
            const { order } = data;

            const options = {
                key: REACT_APP_RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency,
                name: "Ride Payment",
                description: "Complete your ride",
                order_id: order.id,

                handler: (response) => {
                    handleVerify(response);
                },

                modal: {
                    ondismiss: () => {
                        dispatch({
                            type: SHARED_ACTION_TYPES.SET_MESSAGE,
                            payload: "Payment cancelled",
                        });
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        const failureFunction = (err) => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: err?.data?.message || "Order creation failed",
            });
            console.error("Order failed:", err);
        };

        makePayment(successFunction, failureFunction, {rideId,});
    };

    const handleVerify = (response) => {

        const successFunction = () => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Payment successful",
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_RIDE_STATUS,
                payload: "idle",
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_PICKUP,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_DROP,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_DROP_COORDS,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_PICKUP_COORDS,
                payload: null,
            });

            dispatch({
                type: USER_RIDE_ACTION_TYPES.SET_RIDE_OPTIONS,
                payload: [],
            });

            socket.emit(SOCKET_EVENTS.RIDE_COMPLETED, {rideId,});
        };

        const failureFunction = (err) => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: err?.data?.message || "Payment verification failed",
            });
            console.error("Verify failed:", err);
        };

        verifyPayment(successFunction, failureFunction, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            rideId,
        });
    };

    return (
        <button
            onClick={handlePayment}
            className="relative flex items-center overflow-hidden rounded-2xl bg-white text-black shadow-md group"
        >
            <span className="absolute inset-0 bg-green-600 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>

            <div className="relative flex items-center font-semibold z-10">
                <div className="w-12 h-10 flex items-center justify-center bg-green-600">
                    <FiArrowUpRight
                        size={20}
                        className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                </div>

                <span className="px-4 py-1 transition-colors duration-300 group-hover:text-white">
                    Make Payment
                </span>
            </div>
        </button>
    );
};

export default MakePaymentButton;