import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;
  
    // Add user's message to the chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
  
    try {
      // Send the message to the server and get the AI's response
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.response) {
        setMessages([...newMessages, { sender: "ai", text: data.response }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: "No response from AI." }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { sender: "ai", text: "Error: Could not get a response." }]);
    }
  
    // Clear the input field
    setInput("");
  };
  

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor:
                  message.sender === "user" ? "#0084ff" : "#f1f0f0",
                color: message.sender === "user" ? "#fff" : "#000",
              }}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
        placeholder="Type your message..."
        onKeyPress={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 15px",
          borderRadius: "4px",
          backgroundColor: "#0084ff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;
