import {useContext, useEffect, useState} from "react";
import UberBG from "../../assets/auto_bg.jpg";
import Navbar from "./Navbar.jsx";
import UserAuthCard from "./userAuth/UserAuthCard.jsx";
import AboutSection from "./About.jsx";
import Services from "./Services.jsx";
import Footer from "./Footer.jsx";
import UserWelcome from "./UserWelcome.jsx";
import CaptainWelcome from "./CaptainWelcome.jsx";
import CaptainAuthCard from "./captainAuth/CaptainAuthCard.jsx";
import {AuthContext} from "../ProtectedRoute/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [role, setRole] = useState("user");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { user, loading } = auth;
    useEffect(() => {
        if (loading) return;
        if (user?.role === "user") {
            navigate("/user-dashboard", { replace: true });
        }
        if (user?.role === "captain") {
            navigate("/captain-dashboard", { replace: true });
        }
    }, [user]);

    return (
        <>
            <div
                className="relative min-h-screen w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${UberBG})` }}
            >
                <Navbar />
                <div className="min-h-screen flex flex-col sm:flex-row items-center justify-between gap-10 px-6 sm:px-20 pt-24 sm:pt-28">
                    <div className="w-full sm:w-1/2 text-center sm:text-left space-y-6">
                        <div className="inline-grid grid-cols-2 bg-white rounded-xl p-1.5">
                            <button
                                onClick={() => setRole("user")}
                                className={`px-8 py-3 rounded-lg text-base font-medium cursor-pointer transition ${
                                    role === "user"
                                        ? "bg-black text-white"
                                        : "text-black"
                                }`}
                            >
                                User
                            </button>
                            <button
                                onClick={() => setRole("captain")}
                                className={`px-8 py-3 rounded-lg text-base font-medium cursor-pointer transition ${
                                    role === "captain"
                                        ? "bg-black text-white"
                                        : "text-black"
                                }`}
                            >
                                Captain
                            </button>
                        </div>
                        {role === "user" ? <UserWelcome /> : <CaptainWelcome />}
                    </div>
                    <div className="w-full sm:w-1/2 flex justify-center sm:justify-end">
                        {role === "user" ? <UserAuthCard /> : <CaptainAuthCard />}
                    </div>
                </div>
            </div>
            <AboutSection />
            <Services />
            <Footer />
        </>
    );
};

export default Home;
