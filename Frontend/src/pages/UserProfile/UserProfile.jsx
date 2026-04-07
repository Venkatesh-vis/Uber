import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import {FiEdit2, FiCheck, FiLogOut, FiArrowLeft} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {logout, updateUser} from "../../api/user/user-api.js";
import {SHARED_ACTION_TYPES} from "../../reducers/sharedReducer.js";
import {USER_SIGNIN_ACTION_TYPES} from "../../reducers/userReducer.js";

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.fullname.firstname,
                lastname: user.fullname.lastname,
                email: user.email,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => setIsEditing(prev => !prev);

    const handleUpdate = () => {
        setIsEditing(false);

        const requestBody = {
            fullname: {
                firstname: formData.firstname,
                lastname: formData.lastname
            },
            email: formData.email
        };

        const successFunction = (updatedUser) => {

            dispatch({
                type: USER_SIGNIN_ACTION_TYPES.SET_USER,
                payload: updatedUser
            });

            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Profile updated successfully"
            })
        };

        const failureFunction = (err) => {
            console.error("Update error", err);
        };

        updateUser(requestBody, successFunction, failureFunction);
    };

    const handleLogout = () => {

        const successFunction = () => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Logged out successfully"
            })
            navigate("/");
        }

        const failureFunction = (err) => {
            console.error("Logout error", err)
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Logout failed"
            })
        }

        logout( successFunction, failureFunction);
    };

    const goBack = () => {
        navigate("/user-dashboard");
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">

            <header className="w-full flex items-center justify-between p-6 bg-white shadow-md">
                <button onClick={goBack} className="flex cursor-pointer items-center gap-2 text-gray-700 hover:text-black transition font-medium">
                    <FiArrowLeft size={20} />
                    Back
                </button>

                <button
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition"
                >
                    <FiLogOut size={18} />
                    Logout
                </button>
            </header>

            <main className="flex-1 w-full p-6 md:p-12 flex flex-col md:flex-row gap-12">

                <div className="flex flex-col items-center md:items-start md:w-1/3">
                    <FaUserCircle size={120} className="text-gray-400" />
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">{user?.fullname.firstname} {user?.fullname.lastname}</h2>
                    <p className="text-gray-500 mt-1 text-lg">{user?.email}</p>
                </div>

                <div className="flex-1 flex flex-col justify-start gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-500 text-sm mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    isEditing ? "border-black-500" : "border-gray-300 bg-gray-100"
                                } focus:outline-none`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    isEditing ? "border-black-500" : "border-gray-300 bg-gray-100"
                                } focus:outline-none`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-500 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                isEditing ? "border-black-500" : "border-gray-300 bg-gray-100"
                            } focus:outline-none`}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <button
                            onClick={isEditing ? handleUpdate : handleEditToggle}
                            className={`w-full cursor-pointer py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                                isEditing
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-black text-white hover:bg-gray-900"
                            }`}
                        >
                            {isEditing ? <FiCheck size={18} /> : <FiEdit2 size={18} />}
                            {isEditing ? "Update" : "Edit"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;