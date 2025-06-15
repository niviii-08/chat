import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/react"; // Use `react` import not `next`

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
    setMessages((prev) => [...prev, { text, sender, isBotResponse }]);
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
      const res = await fetch('/api/chatt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "API failed");

      addMessage(data.result || "Bot could not respond clearly.", 'bot', true);
    } catch (err) {
      addMessage(`Bot: Error - ${err.message}`, 'bot', true);
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
      addMessage("📤 Uploading and analyzing image...", 'user');
      setIsLoading(true);

      try {
        const res = await fetch('/api/chatt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: inputText || "Analyze this image.",
            imageBase64: base64,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Image API error");

        addMessage(data.result || "Bot: Couldn't interpret the image properly.", 'bot', true);
      } catch (err) {
        addMessage(`Bot: Error analyzing image - ${err.message}`, 'bot', true);
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
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}-message`}>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) handleSendMessage();
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

      <Analytics />
    </>
  );
};

export default ChatbotWidget;
