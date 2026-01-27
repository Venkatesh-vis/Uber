import { FaCircle, FaSquare } from "react-icons/fa";

const LocationInputs = ({ trip, setTrip }) => {
    return (
        <div className="bg-white rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold">
                Find a trip
            </h2>

            {/* Pickup */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                <FaCircle className="text-black text-xs" />

                <input
                    type="text"
                    placeholder="Pickup location"
                    value={trip.pickup}
                    onChange={(e) =>
                        setTrip(prev => ({
                            ...prev,
                            pickup: e.target.value,
                            searched: false,
                        }))
                    }
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {/* Drop */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                <FaSquare className="text-black text-xs" />

                <input
                    type="text"
                    placeholder="Drop-off location"
                    value={trip.drop}
                    onChange={(e) =>
                        setTrip(prev => ({
                            ...prev,
                            drop: e.target.value,
                            searched: false,
                        }))
                    }
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>
        </div>
    );
};

export default LocationInputs;
