import LocationInputs from "./LocationInputs";

const RideSearchPanel = ({ trip, setTrip, onSearch }) => {
    return (
        <div className="h-fit md:h-full p-4">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
            <LocationInputs trip={trip} setTrip={setTrip} />

                {!trip.searched && (
                    <button
                        onClick={onSearch}
                        className="bg-black cursor-pointer text-white py-3 rounded-lg font-medium"
                    >
                        Search
                    </button>
                )}
            </div>
        </div>
    );
};

export default RideSearchPanel;
