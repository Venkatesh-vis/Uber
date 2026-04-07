import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit2, FiCheck, FiLogOut, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SHARED_ACTION_TYPES } from "../../reducers/sharedReducer.js";
import { CAPTAIN_ACTION_TYPES } from "../../reducers/captainReducer.js";
import {logoutCaptain, updateCaptain} from "../../api/captain/captain-api.js";

const CaptainProfile = () => {
    const dispatch = useDispatch();
    const captain = useSelector(state => state.captain);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        color: "",
        plate: "",
        capacity: "",
        vehicleType: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (captain) {
            setFormData({
                firstname: captain.fullname.firstname,
                lastname: captain.fullname.lastname,
                email: captain.email,
                color: captain.vehicle.color,
                plate: captain.vehicle.plate,
                capacity: captain.vehicle.capacity,
                vehicleType: captain.vehicle.vehicleType
            });
        }
    }, [captain]);

    const validateCaptainForm = (formData) => {
        const newErrors = {};

        if (!formData.firstname || formData.firstname.trim().length < 4) {
            newErrors.firstname = "First name must be at least 4 characters";
        }

        if (!formData.lastname || formData.lastname.trim().length < 4) {
            newErrors.lastname = "Last name must be at least 4 characters";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
        }

        if (!formData.color || formData.color.trim().length < 3) {
            newErrors.color = "Color must be at least 3 characters";
        }

        if (!formData.plate || formData.plate.trim().length < 6) {
            newErrors.plate = "Plate must be at least 6 characters";
        }

        const capacity = Number(formData.capacity);

        if (!capacity || capacity < 1) {
            newErrors.capacity = "Capacity must be at least 1";
        } else {
            if (formData.vehicleType === "motorcycle" && capacity !== 1) {
                newErrors.capacity = "Motorcycle capacity must be 1";
            }
            if (formData.vehicleType === "auto" && capacity > 3) {
                newErrors.capacity = "Auto max is 3";
            }
            if (formData.vehicleType === "car" && capacity > 5) {
                newErrors.capacity = "Car max is 5";
            }
        }

        return newErrors;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            let updated = { ...prev, [name]: value };

            const vehicleType = updated.vehicleType;
            const capacity = Number(updated.capacity);

            if (vehicleType === "motorcycle") {
                updated.capacity = 1;
            }

            if (vehicleType === "auto" && capacity > 3) {
                updated.capacity = 3;
            }

            if (vehicleType === "car" && capacity > 5) {
                updated.capacity = 5;
            }

            return updated;
        });
    };

    const handleEditToggle = () => setIsEditing(prev => !prev);

    const handleUpdate = () => {
        const validationErrors = validateCaptainForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsEditing(false);

        const requestBody = {
            fullname: {
                firstname: formData.firstname,
                lastname: formData.lastname
            },
            email: formData.email,
            vehicle: {
                color: formData.color,
                plate: formData.plate,
                capacity: Number(formData.capacity),
                vehicleType: formData.vehicleType
            }
        };


        const successFunction = (updatedCaptain) => {
            dispatch({
                type: CAPTAIN_ACTION_TYPES.SET_CAPTAIN,
                payload: updatedCaptain
            });

            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Profile updated successfully"
            });
        }


        const failureFunction = (err) => {
            console.error("Update error", err);
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Failed to update profile"
            });
        }

        updateCaptain(successFunction, failureFunction, requestBody,);
    };

    const handleLogout = () => {

        const successfunction = () => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: "Logged out successfully"
            });
            navigate("/");
        }

        const failurefunction = (err) => {
            console.error("Logout error", err);
        }

        logoutCaptain(successfunction, failurefunction);
    };

    const goBack = () => {
        navigate("/captain-dashboard");
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col">

            <header className="w-full flex items-center justify-between p-6 bg-white shadow-md">
                <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-gray-700 hover:text-black transition font-medium"
                >
                    <FiArrowLeft size={20} />
                    Back
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition"
                >
                    <FiLogOut size={18} />
                    Logout
                </button>
            </header>

            <main className="flex-1 w-full p-6 md:p-12 flex flex-col md:flex-row gap-12">

                <div className="flex flex-col items-center md:items-start md:w-1/3">
                    <FaUserCircle size={120} className="text-gray-400" />
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">
                        {captain?.fullname.firstname} {captain?.fullname.lastname}
                    </h2>
                    <p className="text-gray-500 mt-1 text-lg">{captain?.email}</p>
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
                                    isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                                }`}
                            />
                            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
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
                                    isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                                }`}
                            />
                            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
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
                                isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Vehicle Color</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                                }`}
                            />
                            {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Plate Number</label>
                            <input
                                type="text"
                                name="plate"
                                value={formData.plate}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                                }`}
                            />
                            {errors.plate && <p className="text-red-500 text-sm mt-1">{errors.plate}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                                }`}
                            />
                            {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Vehicle Type</label>
                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    isEditing ? "border-gray-900" : "border-gray-300 bg-gray-100"
                                }`}
                            >
                                <option value="car">Car</option>
                                <option value="motorcycle">Motorcycle</option>
                                <option value="auto">Auto</option>
                            </select>
                            {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <button
                            onClick={isEditing ? handleUpdate : handleEditToggle}
                            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
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

export default CaptainProfile;