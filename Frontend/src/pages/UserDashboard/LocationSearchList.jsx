import { FaMapMarkerAlt } from "react-icons/fa";

const SearchedLocationCard = ({ label, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow cursor-pointer hover:bg-gray-50"
        >
            <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                <FaMapMarkerAlt className="text-black text-sm" />
            </div>

            <span className="text-sm font-medium text-gray-800">
                {label}
            </span>
        </div>
    );
};

export default SearchedLocationCard;
