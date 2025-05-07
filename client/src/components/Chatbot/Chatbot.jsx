import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

const ChatBox = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const toggleChat = () => setIsOpen((prev) => !prev);

  const addMessage = (role, content, image = null) => {
    setMessages((prev) => [...prev, { role, content, image }]);
  };

  const handleTextSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    addMessage("user", userMessage);
    setInputMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();
      addMessage("bot", data.answer);
    } catch (err) {
      console.error(err);
      addMessage("bot", "Error: Failed to get response");
    }
  };

  const handleImageSend = async (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    addMessage("user", "", imageUrl);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("prompt", "Is this item recyclable?");

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/ask-image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      addMessage("bot", data.answer);
    } catch (err) {
      console.error(err);
      addMessage("bot", "Error: Failed to analyze image");
    }
  };

  return (
    <>
      {/* Button to open chat */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 z-50"
        >
          RecycleWise Chatbot
        </button>
      )}

      {/* Chatbox container */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[550px] flex flex-col bg-white rounded-lg shadow-lg z-50">
          <ChatHeader toggleChat={toggleChat} />

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i}>
                <ChatMessage message={msg} />
                {msg.image && (
                  <div
                    className={`mt-2 ${
                      msg.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <img
                      src={msg.image}
                      alt="Uploaded"
                      className="max-w-[70%] rounded-xl shadow"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <ChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleTextSend={handleTextSend}
              handleImageSend={handleImageSend}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
