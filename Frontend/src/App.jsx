import React from "react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Toast from "./shared/Toast.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";
import AuthProvider from "./pages/ProtectedRoute/AuthProvider.jsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.jsx";
import CaptainDashboard from "./pages/CaptainDashboard/CaptainDashboard.jsx";


function App() {

    return (
        <>
            <Toast />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/captain-dashboard"
                        element={
                            <ProtectedRoute>
                                <CaptainDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </>

    )
}

export default App
