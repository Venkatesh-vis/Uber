import ChatWindow from "../ChatBox/ChatWindow.jsx";
import { useSelector } from "react-redux";
import useChatSocket from "../ChatBox/chatHook/useChatSocket.js";

const CaptainChat = () => {
    const rideId = useSelector(state => state.captainRideRequest.acceptedRide?.ride?._id);
    const captain = useSelector(state => state.captain);
    const { messages, sendMessage } = useChatSocket(rideId, captain._id);

    console.log(useSelector(state => state.captainRideRequest.acceptedRide.ride.otpVerified));

    if (!rideId || !captain._id) return null;

    return (
        <div className="w-full md:w-[400px] lg:w-[450px] xl:w-[500px] pl-0 md:pl-4 pt-4 md:pt-0">
            <ChatWindow
                heading={"Chat with your passenger"}
                messages={messages}
                onSend={sendMessage}
                currentUserId={captain._id}
            />
        </div>
    );
};

export default CaptainChat;