// src/components/FeedbackList.js
import React from 'react';

function FeedbackList({ feedbackItems, onDeleteFeedback }) {
  if (feedbackItems.length === 0) {
    return (
      <div style={listStyles.noFeedback}>
        No feedback yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div style={listStyles.container}>
      <h3 style={listStyles.heading}>Customer Feedback</h3>
      <ul style={listStyles.ul}>
        {feedbackItems.map((feedback, index) => (
          <li key={index} style={listStyles.li}>
            <p style={listStyles.feedbackText}>{feedback}</p>
            <button
              onClick={() => onDeleteFeedback(index)}
              style={listStyles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Basic inline styles for FeedbackList
const listStyles = {
  container: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    maxWidth: '700px', // Wider to accommodate more feedback
    margin: '30px auto',
  },
  heading: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.5em',
    textAlign: 'center',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #eee',
    borderRadius: '6px',
    padding: '15px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  feedbackText: {
    margin: 0,
    flexGrow: 1, // Allows text to take available space
    paddingRight: '15px',
    color: '#555',
    lineHeight: '1.5',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
  deleteButtonHover: { // For hover effect
    backgroundColor: '#c82333',
  },
  noFeedback: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
    fontSize: '1.1em',
    fontStyle: 'italic',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '30px auto',
  }
};

export default FeedbackList;