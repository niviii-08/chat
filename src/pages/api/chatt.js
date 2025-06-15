// src/pages/api/chatt.js

import OpenAI from 'openai';
import admin from 'firebase-admin';

// ✅ Parse service account JSON from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

// ✅ Initialize Firebase Admin once
if (!admin.apps.length && serviceAccount.project_id) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// ✅ Initialize DeepSeek API
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, userId } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    // ✅ Log to Firestore (optional)
    if (userId && admin.apps.length) {
      const db = admin.firestore();
      await db.collection('chatlogs').add({
        userId,
        prompt,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // ✅ Generate DeepSeek response
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const result = completion.choices?.[0]?.message?.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error?.message || String(error),
    });
  }
}
