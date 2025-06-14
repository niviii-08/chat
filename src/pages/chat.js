import { useState } from 'react';

export default function ChatPage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const questions = [
    'What is image recognition AI',
    'How does image recognition work',
    'Uses of image recognition',
    'Benefits of image recognition AI',
    'Limitations of image recognition',
    'Can image recognition detect faces',
    'Examples of image recognition AI',
    'What are convolutional neural networks',
    'Difference between object detection and recognition',
    'Future of image recognition AI',
  ];

  const askChat = async (prompt) => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.result || 'No response.');
    } catch (err) {
      setResponse('⚠️ Error fetching response.');
    }
    setLoading(false);
  };

  return (
    <div className="chat-wrapper">
      <h1>🤖 Image Recognition Chatbot</h1>
      <p className="subtitle">Tap a cloud to ask a question!</p>

      <div className="button-grid">
        {questions.map((q, index) => (
          <button key={index} className="cloud-button" onClick={() => askChat(q)}>
            ☁️ {q}
          </button>
        ))}
      </div>

      <div className="response-box">
        <h3>💬 Response</h3>
        <p>{loading ? '⏳ Thinking...' : response}</p>
      </div>

      <style jsx>{`
        .chat-wrapper {
          padding: 50px 20px;
          min-height: 100vh;
          background: linear-gradient(to right, #dbeafe, #f0f4ff);
          font-family: 'Segoe UI', sans-serif;
          text-align: center;
        }

        h1 {
          font-size: 2.4rem;
          margin-bottom: 10px;
          color: #1e40af;
        }

        .subtitle {
          font-size: 1.1rem;
          margin-bottom: 30px;
          color: #475569;
        }

        .button-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .cloud-button {
          background: linear-gradient(to bottom right, #e0f7fa, #b2ebf2);
          border: 2px solid #7dd3fc;
          color: #0f172a;
          padding: 14px 20px;
          border-radius: 40px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
        }

        .cloud-button:hover {
          background: linear-gradient(to bottom right, #7dd3fc, #bae6fd);
          transform: translateY(-4px);
        }

        .response-box {
          background: #fff;
          max-width: 700px;
          margin: 0 auto;
          padding: 24px 32px;
          border-radius: 16px;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
          text-align: left;
        }

        .response-box h3 {
          margin-bottom: 10px;
          color: #065f46;
        }

        .response-box p {
          font-size: 1.1rem;
          color: #1f2937;
        }

        @media (max-width: 600px) {
          .cloud-button {
            width: 100%;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}