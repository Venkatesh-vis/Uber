import React from 'react';
import CaptainHeader from "./CaptainHeader.jsx";
import useCaptainSocket from "./captainhooks/useCaptainSocket.js";
import IdleCaptain from "./IdleCaptain.jsx";
import {useSelector} from "react-redux";
import BusyCaptain from "./BusyCaptain.jsx";
import useIsMobile from "./captainhooks/useIsMobile.js";
import DesktopBlock from "../../shared/DesktopBlock.jsx";

const CaptainDashboard = () => {

    const isMobile = useIsMobile();
    useCaptainSocket();
    const captainStatus = useSelector(state => state.captain.status);


    if (!isMobile) {
        return <DesktopBlock />;
    }

    return (
        <>
            <CaptainHeader/>
            {captainStatus === "busy" ? <BusyCaptain /> : <IdleCaptain />}
        </>
    );
};

export default CaptainDashboard;