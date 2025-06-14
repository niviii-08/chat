// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2HpG_NoZdVntgRvBCv2ur1NhFtyjYVW0",
  authDomain: "chatbot-ai-7339c.firebaseapp.com",
  projectId: "chatbot-ai-7339c",
  storageBucket: "chatbot-ai-7339c.appspot.com",  // ✅ Fixed here
  messagingSenderId: "810694497307",
  appId: "1:810694497307:web:1e329a19295e670b75d4be",
  measurementId: "G-XYB4NERWBJ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
