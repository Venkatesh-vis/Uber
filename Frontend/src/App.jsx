import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/" element={<UserSignup/>}/>
            <Route path="/" element={<UserLogin/>}/>
            <Route path="/" element={<CaptainSignup/>}/>
            <Route path="/" element={<CaptainSignup/>}/>
        </Routes>
    )
}

export default App
