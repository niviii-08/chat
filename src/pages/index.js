import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const navTo = (path) => () => router.push(path);

  return (
    <>
      <Head>
        <title>Welcome to Chatbot.ai</title>
        <meta name="description" content="A sleek Next.js AI Chatbot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-bg">
        <div className="card">
          <h1>Welcome to Chatbot.ai</h1>

          <div className="buttons">
            <button onClick={navTo('/contact')} className="btn btn-contact">
              CONTACT
            </button>
            <button onClick={navTo('/about')} className="btn btn-about">
              ABOUT
            </button>
            <button onClick={navTo('/chat')} className="btn btn-chat">
              WHY CHATBOT.AI ?
            </button>
            <button onClick={navTo('/chatt')} className="btn btn-chat-alt">
              CHAT
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body,
        html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: 'Inter', sans-serif;
        }

        .page-bg {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e4c1f9 0%, #fbcfe8 100%);
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 60px 40px;
          border-radius: 16px;
          text-align: center;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .card h1 {
          margin: 0 0 40px;
          font-size: 2.5rem;
          color: #5b21b6;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: center;
        }

        .btn {
          width: 220px;
          padding: 16px 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          background: none;
          border: none;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        /* Contact Button – Coral */
        .btn-contact {
          background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
        }
        .btn-contact:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(245, 101, 101, 0.3);
        }

        /* About Button – Indigo */
        .btn-about {
          background: linear-gradient(135deg, #667eea 0%, #5a67d8 100%);
        }
        .btn-about:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(90, 103, 216, 0.3);
        }

        /* Chat Button – Emerald */
        .btn-chat {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }
        .btn-chat:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(56, 161, 105, 0.3);
        }

        /* Chat Alt Button – Sky Blue */
        .btn-chat-alt {
          background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%);
        }
        .btn-chat-alt:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(66, 153, 225, 0.3);
        }

        @media (max-width: 480px) {
          .card {
            padding: 40px 20px;
          }
          .card h1 {
            font-size: 2rem;
            margin-bottom: 32px;
          }
          .btn {
            width: 180px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
