import { useContext, useState } from "react";
import { captainSignUp } from "../../../api/captain/captain-api.js";
import { useDispatch } from "react-redux";
import { CAPTAIN_SIGNIN_ACTION_TYPES } from "../../../reducers/captainReducer.js";
import { SHARED_ACTION_TYPES } from "../../../reducers/sharedReducer.js";
import { AuthContext } from "../../ProtectedRoute/AuthProvider.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CaptainSignup = ({ onSwitch }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        color: "",
        plate: "",
        capacity: "",
        vehicleType: "",
    });

    const dispatch = useDispatch();
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            fullname: {
                firstname: form.firstname,
                lastname: form.lastname,
            },
            email: form.email,
            password: form.password,
            vehicle: {
                color: form.color,
                plate: form.plate,
                capacity: Number(form.capacity),
                vehicleType: form.vehicleType,
            },
        };

        const successFunction = (res) => {
            dispatch({
                type: CAPTAIN_SIGNIN_ACTION_TYPES.SET_CAPTAIN,
                payload: res.captain,
            });
            setLoading(false);
            auth.checkAuth();
        };

        const failureFunction = (err) => {
            setLoading(false);
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: err?.data?.message || "Signup failed",
            });
            console.error("Captain signup failed:", err);
        };

        captainSignUp(successFunction, failureFunction, payload);
    };

    return (
        <div className="w-full px-4 sm:px-0 flex justify-center">
            <div className="bg-white/30 backdrop-blur-lg p-6 sm:p-8 rounded-xl max-w-sm sm:max-w-md lg:max-w-lg w-full">

            <h2 className="text-xl font-bold mb-6 text-center sm:text-left">
                    Become a Captain
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            name="firstname"
                            placeholder="First name"
                            value={form.firstname}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                        />
                        <input
                            name="lastname"
                            placeholder="Last name"
                            value={form.lastname}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    />

                    {/* Password Field */}
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 pr-10 bg-transparent outline-none border-b border-white/40"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-black/70 cursor-pointer"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <select
                        name="vehicleType"
                        value={form.vehicleType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    >
                        <option value="" disabled>
                            Select vehicle type
                        </option>
                        <option value="car">Car</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="auto">Auto</option>
                    </select>

                    <input
                        name="color"
                        placeholder="Vehicle color"
                        value={form.color}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    />

                    <input
                        name="plate"
                        placeholder="Vehicle plate number"
                        value={form.plate}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    />

                    <input
                        type="number"
                        name="capacity"
                        placeholder="Vehicle capacity"
                        value={form.capacity}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            w-full py-3 rounded-lg
                            bg-black text-white
                            flex items-center justify-center
                            transition
                            ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                        `}
                    >
                        {loading ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                </form>

                <p className="text-sm mt-4 text-center">
                    Already registered?{" "}
                    <button
                        type="button"
                        onClick={onSwitch}
                        className="font-semibold cursor-pointer underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
