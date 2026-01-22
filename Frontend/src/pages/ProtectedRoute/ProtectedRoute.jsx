import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import Spinner from "../../shared/Spinner.jsx";

const ProtectedRoute = ({ children }) => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    if (!auth) {
        throw new Error("ProtectedRoute must be used within AuthProvider");
    }

    const { user, loading } = auth;

    if (loading) {
        return <Spinner />;
    }

    if (!user || !user.id) {
        return <Navigate to="/" replace />;
    }

    const path = location.pathname;

    if (user.role === "captain" && path.startsWith("/user")) {
        return <Navigate to="/captain-dashboard" replace />;
    }

    if (user.role === "user" && path.startsWith("/captain")) {
        return <Navigate to="/user-dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
