// src/pages/contact.js
import React, { useState, useEffect } from 'react';
import FeedbackList from '../components/FeedbackList'; // Correct path to your FeedbackList component

export default function Contact() { // Component name matches file name for clarity
  // State to hold feedback items, initialized from localStorage or default values
  const [feedbackItems, setFeedbackItems] = useState(() => {
    // This function runs only once during component initialization.
    // We must ensure localStorage is only accessed in the browser environment.
    if (typeof window !== 'undefined') {
      try {
        const storedFeedback = localStorage.getItem('chatbotFeedback');
        return storedFeedback ? JSON.parse(storedFeedback) : [
          "Great chatbot, very helpful!",
          "Easy to use interface.",
          "Could use more features, but good start."
        ];
      } catch (error) {
        console.error("Failed to load feedback from local storage:", error);
        // Fallback to default feedback if localStorage access fails or data is corrupt
        return [
          "Great chatbot, very helpful!",
          "Easy to use interface.",
          "Could use more features, but good start."
        ];
      }
    }
    // If running on the server (SSR/SSG), return default state
    // localStorage will not be available here, so we provide initial content
    return [
      "Great chatbot, very helpful!",
      "Easy to use interface.",
    ];
  });

  // State for the new feedback input field
  const [newFeedback, setNewFeedback] = useState('');

  // useEffect hook to save feedbackItems to local storage whenever it changes
  // This effect runs AFTER the initial render and only on the client-side.
  useEffect(() => {
    // Although useEffect generally runs client-side, this guard is a good practice
    // for explicit clarity when dealing with browser-specific APIs.
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('chatbotFeedback', JSON.stringify(feedbackItems));
      } catch (error) {
        console.error("Failed to save feedback to local storage:", error);
      }
    }
  }, [feedbackItems]); // Dependency array: the effect re-runs when feedbackItems changes

  // Handler for adding new feedback
  const handleAddFeedback = () => {
    if (newFeedback.trim()) { // Ensure feedback is not empty or just whitespace
      setFeedbackItems([...feedbackItems, newFeedback.trim()]);
      setNewFeedback(''); // Clear the input field after adding
    }
  };

  // Handler for deleting feedback
  const handleDeleteFeedback = (indexToDelete) => {
    // Filter out the item at the specified index
    setFeedbackItems(feedbackItems.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h2 style={styles.heading}>Contact us at:</h2>
        <h3 style={styles.subheading}>📷 Instagram: <span style={styles.handle}>@Chatbot_ai</span></h3>
        <h3 style={styles.subheading}>📘 Facebook: <span style={styles.handle}>Chatbot_ai</span></h3>

        {/* --- Feedback Section --- */}
        <div style={styles.feedbackSection}>
          <h2 style={styles.heading}>Share Your Feedback!</h2>
          <div style={styles.feedbackInputContainer}>
            <textarea
              style={styles.feedbackTextarea}
              placeholder="Tell us what you think..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              aria-label="Feedback input" // Added for accessibility
            />
            <button
              style={styles.feedbackButton}
              onClick={handleAddFeedback}
            >
              Submit Feedback
            </button>
          </div>
          {/* Render the FeedbackList component, passing necessary props */}
          <FeedbackList
            feedbackItems={feedbackItems}
            onDeleteFeedback={handleDeleteFeedback}
          />
        </div>
        {/* --- End Feedback Section --- */}

      </main>
      <footer style={styles.footer}>
        <p>&copy; 2025 Chatbot Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Styles object for the Contact page
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',
    color: '#333',
    padding: '2rem',
  },
  main: {
    flex: 1, // Allows the main content to grow and push the footer down
    textAlign: 'center',
    paddingTop: '4rem',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#00796b',
  },
  subheading: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
  },
  handle: {
    fontWeight: 'bold',
    color: '#004d40',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#c8e6c9',
    borderTop: '1px solid #ccc',
    fontSize: '0.9rem',
    color: '#555',
  },
  // --- Styles for the Feedback Section ---
  feedbackSection: {
    marginTop: '4rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '4rem auto 2rem auto', // Center it and add more top margin
  },
  feedbackInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
  },
  feedbackTextarea: {
    width: '80%',
    padding: '15px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    minHeight: '100px',
    resize: 'vertical',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
  },
  feedbackButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  // Note: For actual hover effects, consider using CSS modules or styled-components
  // as inline styles don't directly support pseudo-classes like :hover.
  feedbackButtonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.02)',
  }
};