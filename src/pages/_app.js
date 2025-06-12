import "@/styles/globals.css";
// src/pages/_app.js
import '../styles/chat.css'; // ✅ Correct global CSS import
 // ✅ Correct global import

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
