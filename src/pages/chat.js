// components/chat.js (or pages/chat.js if you prefer pages for components)
import React, { useState, useEffect, useRef } from 'react';

const ChatbotWidget = ({ onClose }) => {
    // State to manage messages (each message is an object with text and sender)
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you today?', sender: 'bot' },
        { text: 'I have a question about my order.', sender: 'user' },
        { text: 'Certainly! Please provide your order number.', sender: 'bot' },
    ]);
    const [inputText, setInputText] = useState('');

    // Refs for scrolling and input focus
    const messagesEndRef = useRef(null);
    const chatInputRef = useRef(null);

    // Function to add a new message to the chat
    const addMessage = (text, sender) => {
        setMessages((prevMessages) => [...prevMessages, { text, sender }]);
    };

    // Effect hook to scroll to the bottom of the chat whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle sending a text message when the button is clicked or Enter is pressed
    const handleSendMessage = () => {
        if (inputText.trim()) { // Ensure the message is not just whitespace
            addMessage(inputText, 'user');
            setInputText(''); // Clear the input field
            chatInputRef.current?.focus(); // Keep input focused

            // Simulate a fake bot response after a short delay
            setTimeout(() => {
                addMessage("Thanks for your message! I'm a fake chatbot.", 'bot');
            }, 700);
        }
    };

    // Handle the "fake" image upload event
    const handleFakeImageUpload = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const fakeFileName = file.name;
            addMessage(`Image upload initiated: ${fakeFileName}. (This is a fake upload)`, 'user');

            // Simulate a "processing" message from the bot
            setTimeout(() => {
                addMessage(`Bot: Received your fake image upload "${fakeFileName}". Analyzing... (Not really!)`, 'bot');
            }, 1000);
        }
        // Crucially, clear the file input's value so the `onChange` event fires again
        // if the user tries to "upload" the same file multiple times.
        event.target.value = '';
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                My Chatbot
                {/* Close button for the widget */}
                {onClose && (
                    <button className="close-button" onClick={onClose}>
                        &times; {/* HTML entity for multiplication sign, often used for close button */}
                    </button>
                )}
            </div>
            <div className="chat-messages">
                {/* Map through the messages state to render each message */}
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}-message`}>
                        {msg.text}
                    </div>
                ))}
                {/* A hidden div to scroll to for auto-scrolling to the bottom */}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    ref={chatInputRef} // Attach ref to input
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)} // Update state on input change
                    onKeyPress={(e) => { // Handle Enter key press
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <div className="action-buttons">
                    <div className="upload-btn-wrapper">
                        {/* The upload button is styled by .btn-upload class in global CSS */}
                        <button className="btn-upload">
                            <span className="icon">📁</span> Upload Image
                        </button>
                        {/* The actual file input, made invisible and placed over the button */}
                        <input
                            type="file"
                            accept="image/*" // Suggests image files
                            onChange={handleFakeImageUpload} // Handles file selection
                        />
                    </div>
                    {/* The send button is styled by .action-buttons button class in global CSS */}
                    <button onClick={handleSendMessage}>
                        <span className="icon">✉️</span> Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotWidget;