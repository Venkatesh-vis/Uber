import { IoSend } from "react-icons/io5";

const ChatWindow = ({ messages, onSend, currentUserId, heading }) => {
    return (
        <div className="flex flex-col h-[500px] md:h-[600px] bg-yellow-100 rounded-2xl overflow-hidden border border-yellow-300 shadow-md">

            <div className="px-4 text-center py-3 border-b border-yellow-300 bg-yellow-200 font-semibold text-sm text-gray-800">
                {heading}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[75%] px-3 py-2 rounded-xl break-words text-sm ${
                            msg.senderId === currentUserId
                                ? "ml-auto bg-black text-white"
                                : "mr-auto bg-white text-gray-800 shadow-sm"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const text = e.target.message.value.trim();
                    if (!text) return;

                    onSend(text);
                    e.target.reset();
                }}
                className="flex items-center gap-2 p-3 border-t border-yellow-300 bg-yellow-50"
            >
                <input
                    name="message"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-full bg-white outline-none text-sm shadow-sm"
                />

                <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-full"
                >
                    <IoSend size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;