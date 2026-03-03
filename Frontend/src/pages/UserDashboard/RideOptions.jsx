import { useSelector, useDispatch } from "react-redux";
import { USER_RIDE_ACTION_TYPES } from "../../reducers/userRideReducer.js";
import bike from "../../assets/bike_ride.webp";
import auto from "../../assets/auto_ride.webp";
import car from "../../assets/car_ride.png";
import RideOptionCard from "./RideOptionCard";
import PaymentBar from "./PaymentBar";
import Loader from "../../shared/Loader.jsx";

const VEHICLE_META = {
    motorcycle: {
        id: "motorcycle",
        name: "Bike Saver",
        image: bike,
        subtitle: "Faster",
    },
    auto: {
        id: "auto",
        name: "Auto",
        image: auto,
        subtitle: "Cash/UPI only",
    },
    car: {
        id: "car",
        name: "Uber Go",
        image: car,
        subtitle: "Affordable compact AC rides",
    },
};

const RideOptions = () => {
    const dispatch = useDispatch();
    const rideOptions = useSelector(state => state.userRide.rideOptions);
    const selectedRide = useSelector(state => state.userRide.selectedRide);
    const loading = useSelector(state => state.userRide.loading);


    return (
        <>
            {loading ? <Loader/> : <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-3 px-4">

                    {rideOptions.map((ride) => {

                        const meta = VEHICLE_META[ride.vehicleType];
                        if (!meta) return null;

                        const mergedRide = {
                            id: meta.id,
                            name: meta.name,
                            image: meta.image,
                            subtitle: meta.subtitle,
                            discount: `${ride.discountPercent}% off`,
                            price: ride.finalFare,
                            originalPrice: ride.originalFare,
                            distance: ride.distance,
                            duration: ride.duration,
                            vehicleType: ride.vehicleType,
                        };

                        return (
                            <RideOptionCard
                                key={meta.id}
                                ride={mergedRide}
                                selected={selectedRide?.vehicleType === ride.vehicleType}
                                onClick={() =>
                                    dispatch({
                                        type: USER_RIDE_ACTION_TYPES.SET_SELECTED_RIDE,
                                        payload: mergedRide,
                                    })
                                }
                            />
                        );
                    })}
                </div>

                {selectedRide && <PaymentBar ride={selectedRide} />}
            </div>}
        </>

    );
};

export default RideOptions;