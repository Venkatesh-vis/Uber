import React from "react";
import UberBG from "../../assets/auto_bg.jpg";
import Navbar from "./Navbar.jsx";
import Services from "./Services.jsx";
import Footer from "./Footer.jsx";
import Welcome from "./Welcome.jsx";
import UserSignupCard from "./UserSignupCard.jsx";
import AboutSection from "./About.jsx";

const Home = () => {
    return (
        <>
            <div className="relative min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${UberBG})` }}>
                <Navbar />
                <div
                    className="min-h-screen flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-10 px-6 sm:px-20 pt-24 sm:pt-28">
                    <div className="w-full text-center sm:text-left">
                        <Welcome />
                    </div>
                    <div className="w-full flex justify-center sm:justify-end">
                        <UserSignupCard />
                    </div>
                </div>
            </div>
            <AboutSection/>
            <Services />
            <Footer />
        </>
    );
};

export default Home;
