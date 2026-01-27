import { useContext, useState } from "react";
import { userSignUp } from "../../../api/user/user-api.js";
import { useDispatch } from "react-redux";
import { SHARED_ACTION_TYPES } from "../../../reducers/sharedReducer.js";
import { USER_SIGNIN_ACTION_TYPES } from "../../../reducers/userReducer.js";
import { AuthContext } from "../../ProtectedRoute/AuthProvider.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserSignup = ({ onSwitch }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const { firstName, lastName, email, password } = form;

        const payload = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
        };

        const successFunction = (res) => {
            dispatch({
                type: USER_SIGNIN_ACTION_TYPES.SET_USER,
                payload: res.user,
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
            console.error("Signup failed:", err?.data?.message);
        };

        userSignUp(successFunction, failureFunction, payload);
    };

    return (
        <div className="w-full max-w-sm bg-white/30 backdrop-blur-lg p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">
                Create your Uber account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <div className="relative">
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
                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-black hover:text-black/70"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

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
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="font-semibold cursor-pointer underline"
                >
                    Log in
                </button>
            </p>
        </div>
    );
};

export default UserSignup;
