import { useSelector, useDispatch } from "react-redux";
import { USER_RIDE_ACTION_TYPES } from "../../reducers/userRideReducer.js";
import bike from "../../assets/bike_ride.webp";
import auto from "../../assets/auto_ride.webp";
import car from "../../assets/car_ride.png";
import RideOptionCard from "./RideOptionCard";
import PaymentBar from "./PaymentBar";

export const DUMMY_RIDES = [
    {
        id: "bike",
        name: "Bike Saver",
        image: bike,
        time: "1 min away",
        subtitle: "Faster",
        discount: "50% off",
        price: 25.39,
        originalPrice: 50.39,
    },
    {
        id: "auto",
        name: "Auto",
        image: auto,
        time: "1 min away",
        subtitle: "Pay directly to driver, cash/UPI only",
        discount: "60% off",
        price: 30.30,
        originalPrice: 60.30,
    },
    {
        id: "go",
        name: "Uber Go",
        image: car,
        time: "2 mins away",
        subtitle: "Affordable compact AC rides",
        discount: "60% off",
        price: 57.86,
        originalPrice: 144.65,
    },
];

const RideOptions = () => {
    const dispatch = useDispatch();
    const selectedRide = useSelector(state => state.userRide.selectedRide);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-3 px-4">
                {DUMMY_RIDES.map((ride) => (
                    <RideOptionCard
                        key={ride.id}
                        ride={ride}
                        selected={selectedRide?.id === ride.id}
                        onClick={() =>
                            dispatch({
                                type: USER_RIDE_ACTION_TYPES.SET_SELECTED_RIDE,
                                payload: ride,
                            })
                        }
                    />
                ))}
            </div>

            {selectedRide && <PaymentBar ride={selectedRide} />}
        </div>
    );
};

export default RideOptions;
