import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import Spinner from "../../shared/Spinner.jsx";

const ProtectedLayout = ({ allowedRoles }) => {
    const { user, role, loading } = useContext(AuthContext);

    if (loading) return <Spinner />;

    if (!user) return <Navigate to="/" replace />;

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedLayout;