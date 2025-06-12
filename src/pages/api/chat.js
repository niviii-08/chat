// pages/api/chat.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  const userInput = prompt.trim().toLowerCase();

  const responses = {
    'what is image recognition ai': 'Image Recognition AI identifies and processes images to detect objects, faces, scenes, and more.',
    'how does image recognition work': 'It uses machine learning, especially convolutional neural networks (CNNs), to analyze and classify image data.',
    'uses of image recognition': 'Used in facial recognition, medical imaging, self-driving cars, surveillance, and more.',
    'benefits of image recognition ai': 'Improves accuracy, automation, and speed in diagnostics, security, and navigation.',
    'limitations of image recognition': 'Issues include poor image quality, biased data, and high processing costs.',
    'can image recognition detect faces': 'Yes, facial recognition is a key application of image recognition AI.',
    'examples of image recognition ai': 'Examples include Google Lens, Apple Face ID, and Tesla Autopilot.',
    'what are convolutional neural networks': 'CNNs are deep learning models used for image processing and classification.',
    'difference between object detection and recognition': 'Detection finds object locations; recognition identifies the objects.',
    'future of image recognition ai': 'Includes real-time recognition, better healthcare, smart cities, and AR/VR enhancements.'
  };

  const matchedKey = Object.keys(responses).find((key) =>
    userInput.includes(key)
  );

  const result = matchedKey
    ? responses[matchedKey]
    : "Sorry, I don't understand that. Ask something about image recognition AI.";

  return res.status(200).json({ result });
}
