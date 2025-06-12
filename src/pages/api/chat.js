// src/pages/api/chat.js
process.env.OPENAI_API_KEY

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  const userInput = prompt.trim().toLowerCase();

  // Predefined keyword-based responses
  const responses = {
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! 😊 How can I assist you?',
  'what is your name': 'I am your friendly AI chatbot.',
  'how are you': "I'm just code, but I’m doing great! Thanks for asking! 🤖",
  'bye': 'Goodbye! Have a great day! 👋',
  'help': 'Sure, I can help! You can ask me anything.',
  'who made you': 'I was created by a developer using Next.js and React!',
  'thank you': "You're welcome! 😊",
  'what can you do': "I can answer basic questions and simulate conversations. Try asking about time, date, jokes, or greetings!",
  'what is the time': `I'm not a clock, but you can check the time in your system tray or ask your device! ⏰`,
  'what is the date': `Today’s date is ${new Date().toLocaleDateString()}. 📅`,
  'tell me a joke': "Why don't programmers like nature? It has too many bugs. 😄",
  'who are you': "I'm your AI companion. Here to help and chat with you!",
  'open google': "I'm not allowed to open websites, but you can search on https://www.google.com 🔍",
  'how old are you': "I’m timeless! I was just created a few milliseconds ago when you loaded this app. 😄",
  'where are you from': "I'm from the cloud 🌥️ — no physical location, just code!",
  'can you code': "Absolutely! I love writing clean, bug-free code. Just ask me what you want!",
  'tell me something interesting': "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old! 🍯",
  'what is react': "React is a JavaScript library for building user interfaces, maintained by Meta.",
  'what is next.js': "Next.js is a powerful React framework for building full-stack web applications.",
  'good morning': "Good morning! ☀️ Hope you have a productive day ahead!",
  'good night': "Good night! 🌙 Sleep well and recharge for tomorrow.",
  'are you real': "I'm as real as 1s and 0s can be! 👾"
};


  // Match the input to one of the predefined responses
  const matchedKey = Object.keys(responses).find((key) =>
    userInput.includes(key)
  );

  const result = matchedKey
    ? responses[matchedKey]
    : "I'm sorry, I don't understand that. Try asking something else!";

  return res.status(200).json({ result });
}
