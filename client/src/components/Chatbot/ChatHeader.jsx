const ChatHeader = ({ toggleChat }) => {
  return (
    <div className=" text-white bg-[#31533F] flex justify-between items-center p-3 rounded-t-lg">
      <span className="font-bold">Recyclewise Chatbot</span>
      <button
        onClick={toggleChat}
        className="text-white text-lg font-bold hover:text-gray-200"
        aria-label="Close Chat"
      >
        ✕
      </button>
    </div>
  );
};

export default ChatHeader;
