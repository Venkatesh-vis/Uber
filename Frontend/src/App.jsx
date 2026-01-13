import React, {Suspense} from "react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ProtectedRoute from "./pages/Routes/ProtectedRoute.jsx";
import Spinner from "./Components/Spinner.jsx";


function Dashboard() {
    return null;
}

function App() {

    const Admin  = React.lazy(() => import("./pages/Admin/Admin.jsx"));

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={
                <Suspense fallback={<Spinner/>}>
                    <Admin />
                </Suspense>
            }/>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default App
