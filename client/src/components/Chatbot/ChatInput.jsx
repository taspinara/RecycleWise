import { useRef } from "react";

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleTextSend,
  handleImageSend,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageSend(file);
    e.target.value = ""; // Clear input so same file can be re-uploaded if needed
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="flex-1 border rounded px-1 py-2 text-black"
        placeholder="Type a message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleTextSend();
        }}
      />

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Custom button to trigger file input */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-gray-200 rounded px-2 py-2 hover:bg-gray-300"
        title="Upload Image"
      >
        📎
      </button>

      <button
        onClick={handleTextSend}
        className="bg-[#31533F] text-white px-2 py-2 rounded hover:bg-green-600"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
