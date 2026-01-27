const RideOptionCard = ({ ride, selected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
                flex items-center gap-4 p-4 rounded-xl cursor-pointer transition
                ${selected ? "border-2 border-black" : "border border-transparent"}
                hover:bg-gray-50
            `}
        >
            <img
                src={ride.image}
                alt={ride.name}
                className="w-16 h-16 object-contain"
            />

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base">
                        {ride.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                        • {ride.time}
                    </span>
                </div>

                <p className="text-sm text-gray-600">
                    {ride.subtitle}
                </p>
            </div>

            {/* Price */}
            <div className="text-right">
                <div className="text-green-600 text-sm font-medium">
                    {ride.discount}
                </div>
                <div className="text-lg font-semibold">
                    ₹{ride.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400 line-through">
                    ₹{ride.originalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default RideOptionCard;
