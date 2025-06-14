import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([
    {
      text: 'Hello! Welcome to the AI Chat. How can I help you today?',
      sender: 'bot',
      isBotResponse: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  const addMessage = (text, sender, isBotResponse = false) => {
    setMessages((prevMessages) =>
      Array.isArray(prevMessages)
        ? [...prevMessages, { text, sender, isBotResponse }]
        : [{ text, sender, isBotResponse }]
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = inputText;
    addMessage(userMessage, 'user');
    setInputText('');
    chatInputRef.current?.focus();
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType?.includes('application/json')) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await response.json();
      if (data.result) {
        addMessage(data.result, 'bot', true);
      } else {
        addMessage("Bot: I didn't get a clear response. Please try again.", 'bot', true);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      addMessage(`Bot: Sorry, I encountered an error: ${error.message}`, 'bot', true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;

      addMessage("📤 Uploading and analyzing the image...", 'user');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chatt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: inputText || "Please analyze this image.",
            imageBase64: base64,
          }),
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType?.includes('application/json')) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${errorText}`);
        }

        const data = await response.json();
        if (data.result) {
          addMessage(data.result, 'bot', true);
        } else {
          addMessage("Bot: I couldn't interpret the image properly. Try again.", 'bot', true);
        }
      } catch (error) {
        console.error('Image upload error:', error);
        addMessage(`Bot: Error analyzing image: ${error.message}`, 'bot', true);
      } finally {
        setIsLoading(false);
        event.target.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Head>
        <title>AI Chat</title>
        <meta name="description" content="AI Chatbot Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="chat-container">
        <div className="chat-header">
          <Link href="/" passHref>
            <button className="close-button">&larr;</button>
          </Link>
          My AI Chatbot
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
              {msg.text}
            </div>
          ))}

          {isLoading && (
            <div className="message bot-message loading-message">
              <span>Thinking</span>
              <span className="dot-animation">.</span>
              <span className="dot-animation delay-1">.</span>
              <span className="dot-animation delay-2">.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            ref={chatInputRef}
            placeholder={isLoading ? 'Waiting for response...' : 'Type a message...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />

          <div className="action-buttons">
            <div className="upload-btn-wrapper">
              <button className="btn-upload" disabled={isLoading}>
                <span className="icon">📁</span> Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </div>
            <button className="btn-send" onClick={handleSendMessage} disabled={isLoading}>
              <span className="icon">✉️</span> Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
