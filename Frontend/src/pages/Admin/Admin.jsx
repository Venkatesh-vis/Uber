import React from "react";
import { isAdmin } from "../../constants.js";
import AdminLogin from "./AdminLogin/AdminLogin.jsx";
import AdminDashBoard from "./AdminDashBoard/AdminDashBoard.jsx";

const Admin = () => {
    return isAdmin() ? <AdminDashBoard /> : <AdminLogin />;
};

export default Admin;
