// ChatInput.js
const ChatInput = ({ inputMessage, setInputMessage, handleMessageSend }) => {
  const handleChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMessageSend(inputMessage);
    }
  };

  return (
    <div className="flex p-3 bg-gray-100 rounded-b-lg">
      <input
        type="text"
        value={inputMessage}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Ask a question..."
        className="flex-grow p-2 border border-gray-300 rounded-l-lg text-black"
      />
      <button
        onClick={() => handleMessageSend(inputMessage)}
        className="bg-[#31533F] text-white p-2 rounded-r-lg "
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
