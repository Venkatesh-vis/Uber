import {createContext, useEffect, useState} from "react";
import {getAuthenticatedUser} from "../../api/auth/auth-api.js";
import {USER_SIGNIN_ACTION_TYPES} from "../../reducers/userReducer.js";
import {CAPTAIN_ACTION_TYPES} from "../../reducers/captainReducer.js";
import {useDispatch} from "react-redux";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const checkAuth = () => {
        setLoading(true);

        const successFunction = (res) => {
            const authUser = res.user || res.captain;

            setRole(res.role);
            setUser(authUser);
            setLoading(false);

            if (res.role === "user") {
                dispatch({
                    type: USER_SIGNIN_ACTION_TYPES.SET_USER,
                    payload: authUser,
                });
            }

            if (res.role === "captain") {
                dispatch({
                    type: CAPTAIN_ACTION_TYPES.SET_CAPTAIN,
                    payload: authUser,
                });
            }

            if (window.location.pathname === "/") {
                if (res.role === "captain") {
                    window.location.replace("/captain-dashboard");
                } else if (res.role === "user") {
                    window.location.replace("/user-dashboard");
                }
            }
        };

        const failureFunction = () => {
            setUser(null);
            setLoading(false);
        };

        getAuthenticatedUser(successFunction, failureFunction);
    };

    useEffect(() => {
        checkAuth();

        const handleAuthExpired = () => {
            setUser(null);
        };

        window.addEventListener("auth:expired", handleAuthExpired);
        return () => {
            window.removeEventListener("auth:expired", handleAuthExpired);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
