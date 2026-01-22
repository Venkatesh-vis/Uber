import {useContext, useState} from "react";
import {AuthContext} from "../../ProtectedRoute/AuthProvider.jsx";
import {captainLogin} from "../../../api/captain/captain-api.js";
import {SHARED_ACTION_TYPES} from "../../../reducers/sharedReducer.js";
import {CAPTAIN_SIGNIN_ACTION_TYPES} from "../../../reducers/captainReducer.js";
import {useDispatch} from "react-redux";

const CaptainLogin = ({ onSwitch }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const successFunction = (res) => {
            dispatch({type: CAPTAIN_SIGNIN_ACTION_TYPES.SET_CAPTAIN, payload: res.captain});
            setLoading(false);
            auth.checkAuth();
        }

        const failureFunction = (err) => {
            setLoading(false);
            dispatch({type: SHARED_ACTION_TYPES.SET_MESSAGE, payload: err?.data?.message || 'Signup failed'});
            console.error("Captain signup failed:", err);
        }
        captainLogin(successFunction, failureFunction, form);
        auth.checkAuth();
        console.log("Captain login payload:", form);
    };

    return (
        <div className="w-full max-w-sm bg-white/30 backdrop-blur-lg p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">
                Captain Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg bg-black text-white flex items-center justify-center transition ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
                    {loading ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    ) : (
                        "Log in"
                    )}
                </button>
            </form>

            <p className="text-sm mt-4 text-center">
                New captain?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="font-semibold cursor-pointer underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
};

export default CaptainLogin;
