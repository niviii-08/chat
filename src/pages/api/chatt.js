export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // or use another valid model name
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const result = await response.json();

    // ✅ Safely return a response
    return res.status(200).json({ reply: result.choices[0].message.content });

  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
