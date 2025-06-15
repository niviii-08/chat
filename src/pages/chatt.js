import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';

export default function ChattPage() {
  const [messages, setMessages] = useState([
    {
      text: 'Hello! Welcome to the AI Chat. How can I help you today?',
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    addMessage(userText, 'user');
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error from API');

      addMessage(data.result || 'Bot could not answer properly.', 'bot');
    } catch (err) {
      addMessage(`Bot Error: ${err.message}`, 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setIsLoading(true);
      addMessage('Uploading and analyzing image...', 'user');

      try {
        const response = await fetch('/api/chatt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: inputText || 'Analyze this image.', imageBase64: base64Image }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error processing image');

        addMessage(data.result || 'Bot could not interpret the image.', 'bot');
      } catch (err) {
        addMessage(`Bot Error: ${err.message}`, 'bot');
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
        <meta name="description" content="Image and Text AI Chatbot" />
      </Head>

      <div className="chat-container">
        <div className="chat-header">
          <Link href="/">
            <button className="close-button">&larr;</button>
          </Link>
          My AI Chatbot
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>{msg.text}</div>
          ))}
          {isLoading && <div className="message bot">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            ref={chatInputRef}
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            disabled={isLoading}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} disabled={isLoading}>Send</button>
        </div>
      </div>

      <Analytics />
    </>
  );
}
