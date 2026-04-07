import React from "react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Toast from "./shared/Toast.jsx";
import AuthProvider from "./pages/ProtectedRoute/AuthProvider.jsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.jsx";
import CaptainDashboard from "./pages/CaptainDashboard/CaptainDashboard.jsx";
import CaptainProfile from "./pages/CaptainProfile/CaptainProfile.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import ProtectedLayout from "./pages/ProtectedRoute/ProtectedLayout.jsx";


function App() {

    const user = "user";
    const captain = "captain";
    // const admin = "admin";


    return (
        <>
            <Toast />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    //user protected routes
                    <Route element={<ProtectedLayout allowedRoles={[user]} />}>
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                    </Route>

                    //captain protected routes
                    <Route element={<ProtectedLayout allowedRoles={[captain]} />}>
                        <Route path="/captain-dashboard" element={<CaptainDashboard />} />
                        <Route path="/captain-profile" element={<CaptainProfile />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </>

    )
}

export default App
