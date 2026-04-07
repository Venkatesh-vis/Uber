import { FaUserCircle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const UserHeader = () => {

    const navigate = useNavigate();

    const gotToProfile = () => {
        navigate("/user-profile");
    }

    return (
        <header className="w-full h-16 bg-white border-b flex items-center px-6">
            <div className="flex items-center gap-8">
                <div className="text-2xl font-bold tracking-tight">
                    Uber
                </div>
            </div>

            <div className="ml-auto cursor-pointer flex items-center gap-4">
                <button onClick={gotToProfile} className="text-sm font-medium cursor-pointer">
                    Profile
                </button>

                <FaUserCircle className="text-3xl" />
            </div>
        </header>
    );
};

export default UserHeader;
