// /src/pages/api/chatt.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, imageBase64 } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    const messages = imageBase64
      ? [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64, // e.g., 'data:image/jpeg;base64,...'
                },
              },
            ],
          },
        ]
      : [{ role: 'user', content: prompt }];

    const completion = await openai.chat.completions.create({
      model: imageBase64 ? 'gpt-4-vision-preview' : 'gpt-3.5-turbo',
      messages,
      max_tokens: 1000,
    });

    const result = completion.choices?.[0]?.message?.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error('❌ OpenAI API Error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error?.message || String(error),
    });
  }
}
