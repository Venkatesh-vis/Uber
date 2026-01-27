import { FaUserCircle } from "react-icons/fa";

const UserHeader = () => {
    return (
        <header className="w-full h-16 bg-white border-b flex items-center px-6">
            <div className="flex items-center gap-8">
                <div className="text-2xl font-bold tracking-tight">
                    Uber
                </div>

                <nav className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-md font-medium border-black ">
                        Ride
                    </button>
                </nav>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <button className="text-sm font-medium">
                    Activity
                </button>

                <FaUserCircle className="text-3xl cursor-pointer" />
            </div>
        </header>
    );
};

export default UserHeader;
