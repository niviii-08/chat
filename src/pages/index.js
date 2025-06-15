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
            <button onClick={navTo('/contact')} className="btn btn-contact">CONTACT</button>
            <button onClick={navTo('/about')} className="btn btn-about">ABOUT</button>
            <button onClick={navTo('/chat')} className="btn btn-chat">WHY CHATBOT.AI ?</button>
            <button onClick={navTo('/chatt')} className="btn btn-chat-alt">CHAT</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html, body {
          margin: 0; padding: 0; width: 100%; height: 100%;
          font-family: 'Inter', sans-serif;
        }
        .page-bg {
          height: 100vh; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #e4c1f9 0%, #fbcfe8 100%);
        }
        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          padding: 60px 40px; border-radius: 16px; text-align: center;
          max-width: 500px; width: 90%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .card h1 {
          font-size: 2.5rem; margin-bottom: 40px; color: #5b21b6; font-weight: 700;
        }
        .buttons { display: flex; flex-direction: column; gap: 24px; align-items: center; }
        .btn {
          width: 220px; padding: 16px 0; font-size: 1.1rem; font-weight: 600;
          color: #fff; border: none; border-radius: 12px;
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-contact { background: linear-gradient(135deg, #fc8181 0%, #f56565 100%); }
        .btn-about { background: linear-gradient(135deg, #667eea 0%, #5a67d8 100%); }
        .btn-chat { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); }
        .btn-chat-alt { background: linear-gradient(135deg, #63b3ed 0%, #4299e1 100%); }
        .btn:hover { transform: translateY(-3px); }
        @media (max-width: 480px) {
          .card { padding: 40px 20px; }
          .card h1 { font-size: 2rem; }
          .btn { width: 180px; font-size: 1rem; }
        }
      `}</style>
    </>
  );
}