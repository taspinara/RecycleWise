const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 max-w-[75%] rounded-2xl text-sm leading-relaxed shadow-md ${
          isUser
            ? "bg-[#31533F] text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
