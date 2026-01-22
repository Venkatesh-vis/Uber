import {createContext, useEffect, useState} from "react";
import {getAuthenticatedUser} from "../../api/auth/auth-api.js";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = () => {
        setLoading(true);

        const successFunction = (res) => {
            setUser(res.user);
            setLoading(false);
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
        <AuthContext.Provider value={{ user, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
