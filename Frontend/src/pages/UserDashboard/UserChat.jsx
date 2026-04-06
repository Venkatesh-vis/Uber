import {useSelector} from "react-redux";
import useChatSocket from "../ChatBox/chatHook/useChatSocket.js";
import ChatWindow from "../ChatBox/ChatWindow.jsx";

const UserChat = () => {
    const rideId = useSelector(state => state.userRide.currentRideId);
    const user = useSelector(state => state.user);

    console.log("rideid", rideId);

    const { messages, sendMessage } = useChatSocket(rideId, user._id);

    if (!rideId || !user._id) return null;

    return (
        <div className="
            w-full
            md:w-[400px]
            lg:w-[450px]
            xl:w-[500px]
            pl-0 md:pl-4
            pt-4 md:pt-0   /* ✅ FIX */
        ">
            <ChatWindow
                heading={"Chat with your captain"}
                messages={messages}
                onSend={sendMessage}
                currentUserId={user._id}
            />
        </div>
    );
};

export default UserChat;