import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleChat = () => setChatOpen(!chatOpen);

  const handleMessageSend = async (message) => {
    if (!message) return;

    const userMessage = { role: "user", content: message };
    setInputMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.answer };

      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const botErrorMessage = {
        role: "bot",
        content: "Error: Something went wrong",
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        botErrorMessage,
      ]);
    }
  };

  return (
    <div className="relative">
      {!chatOpen && (
        <button
          className="fixed bottom-5 right-5 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
          onClick={toggleChat}
        >
          RecycleWise Chatbot
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg max-h-[500px] flex flex-col">
          <ChatHeader toggleChat={toggleChat} />
          <div className="flex-grow p-4 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </div>
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleMessageSend={handleMessageSend}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
