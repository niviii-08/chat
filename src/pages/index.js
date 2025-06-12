// pages/index.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ChatbotWidget from '../components/chat'; // Import the ChatbotWidget

// Styles for the main page layout and the chat button
// Note: 'link' styles are now replaced by global CSS classes for hover effects.
const styles = {
  container: {
    // Updated styling for the main container
    padding: '50px 20px', // More balanced padding
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif', // This font will be mostly overridden by the global 'Inter' font
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0bbe4 0%, #ffccb3 100%)', // Soft pastel gradient
    color: '#333', // Darker text for better contrast on lighter background
    overflow: 'hidden', // Prevent scrollbars from gradient
    position: 'relative', // For z-index context if needed
  },
  main: {
    // Enhanced styling for the main content box
    maxWidth: '700px', // Slightly wider main content area
    margin: '0 auto',
    padding: '40px', // Increased padding
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // More opaque white for clarity
    borderRadius: '20px', // More rounded box
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)', // More prominent shadow
    backdropFilter: 'blur(5px)', // Frosted glass effect (modern look)
    WebkitBackdropFilter: 'blur(5px)', // For Safari compatibility
    border: '1px solid rgba(255, 255, 255, 0.5)', // Subtle white border
    position: 'relative',
    zIndex: 1, // Ensure main content is above background elements
  },
  heading: {
    // Styling for the main heading
    fontSize: '3rem', // Larger heading
    color: '#6A0572', // A deep purple from the chatbot header
    marginBottom: '40px', // More space below heading
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // Subtle text shadow
    fontWeight: '700', // Bolder font weight
  },
};

// Main Page Component for Next.js
const HomePage = () => {
  // State to manage the visibility of the chatbot widget
  const [showChat, setShowChat] = useState(false);

  // Function to toggle chatbot visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <Head>
        <title>Welcome to Chatbot.ai</title>
        <meta name="description" content="A Next.js application with a toggleable chatbot and navigation." />
        <link rel="icon" href="/favicon.ico" />

        {/* Global CSS for the chatbot widget and overall page appearance */}
        {/* This CSS uses the perfected styling and will override general inline styles where applicable */}
        <style jsx global>{`
          /* --- Google Fonts Import --- */
          /* Using 'Inter' for a modern, clean look across the application */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

          /* --- Global & Body Styles (for the entire page) --- */
          body {
            font-family: 'Inter', sans-serif; /* This will be the primary font, overriding Arial from styles.container */
            background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%); /* Soft, modern gradient background */
            display: flex; /* Helps center the page content as a flex item */
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 0; /* Remove body padding here as container has it */
            box-sizing: border-box;
            color: #333; /* Default text color for the entire page */
            line-height: 1.6;
          }

          /* --- Link Buttons (CONTACT, ABOUT) --- */
          .link-button {
            display: inline-block;
            margin: 15px; /* Increased margin between buttons */
            padding: 15px 30px; /* More padding */
            color: #fff;
            border-radius: 10px; /* More rounded */
            text-decoration: none;
            font-size: 1.2rem; /* Larger font */
            font-weight: bold; /* Bolder text */
            letter-spacing: 0.5px; /* Subtle letter spacing */
            transition: all 0.3s ease-in-out; /* Smooth transition */
            box-shadow: 0 5px 15px rgba(0,0,0,0.2); /* General shadow */
            border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle white border */
            cursor: pointer; /* Indicate clickable */
            text-transform: uppercase; /* Match toggle button style */
          }

          .link-button.contact {
            background: linear-gradient(45deg, #FF6F61 0%, #E65A5A 100%); /* Warm Coral gradient */
            box-shadow: 0 5px 15px rgba(255, 111, 97, 0.4);
          }

          .link-button.contact:hover {
            transform: translateY(-5px) scale(1.02);
            background: linear-gradient(45deg, #E65A5A 0%, #D84315 100%); /* Darker coral on hover */
            box-shadow: 0 8px 20px rgba(255, 111, 97, 0.5);
          }

          .link-button.about {
            background: linear-gradient(45deg, #6B5B95 0%, #886FAD 100%); /* Muted Purple gradient */
            box-shadow: 0 5px 15px rgba(107, 91, 149, 0.4);
          }

          .link-button.about:hover {
            transform: translateY(-5px) scale(1.02);
            background: linear-gradient(45deg, #886FAD 0%, #9D85C4 100%); /* Lighter purple on hover */
            box-shadow: 0 8px 20px rgba(107, 91, 149, 0.5);
          }

          .link-button:active {
            transform: translateY(-2px) scale(0.98);
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }

          /* --- Main Chat Toggle Button --- */
          .toggle-chat-button {
            background: linear-gradient(45deg, #6a0572 0%, #aa076b 100%); /* Elegant purple gradient */
            color: white;
            border: none;
            padding: 18px 35px; /* More padding */
            border-radius: 35px; /* More rounded */
            font-size: 1.3em; /* Slightly larger font */
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); /* Deeper shadow */
            transition: all 0.3s ease-in-out; /* Smooth transition for all changes */
            z-index: 100; /* Ensure it's above other elements if needed */
            letter-spacing: 0.5px;
            text-transform: uppercase;
            position: fixed; /* Makes it float at the bottom right of the viewport */
            bottom: 30px;
            right: 30px;
          }

          .toggle-chat-button:hover {
            transform: translateY(-5px) scale(1.02); /* Lift and slightly enlarge */
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.35); /* Enhance shadow on hover */
            background: linear-gradient(45deg, #7b0682 0%, #bb0876 100%); /* Slightly brighter gradient */
          }

          .toggle-chat-button:active {
            transform: translateY(-2px) scale(0.98); /* Press effect */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }

          /* --- Chatbot Container (the widget itself) --- */
          .chat-container {
            width: 90%;
            max-width: 400px; /* Make it a bit narrower for a more mobile-friendly widget feel */
            height: 600px; /* Fixed height for consistent appearance */
            background-color: #ffffff;
            border-radius: 20px; /* More rounded overall container */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Soft, prominent shadow */
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: fixed; /* Floats on the page */
            bottom: 100px; /* Position above the toggle button */
            right: 30px;
            z-index: 98; /* Below the toggle button if it's separate */
            transform: scale(0.95); /* Start slightly smaller for subtle animation */
            opacity: 0; /* Start hidden for fade-in */
            animation: fadeInScaleUp 0.3s ease-out forwards; /* Fade in and scale up animation */
            border: 1px solid #e0e6ed; /* Subtle border for definition */
          }

          /* Animation for chatbot opening */
          @keyframes fadeInScaleUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* --- Chat Header --- */
          .chat-header {
            background: linear-gradient(90deg, #6a0572 0%, #aa076b 100%); /* Horizontal gradient */
            color: white;
            padding: 18px 25px;
            text-align: center;
            font-size: 1.4em;
            font-weight: 600;
            border-top-left-radius: 18px; /* Match container border-radius */
            border-top-right-radius: 18px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow beneath header */
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 0.5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Separator line */
          }

          .chat-header .close-button {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.8); /* Slightly transparent white */
            font-size: 2em; /* Larger X */
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            padding: 5px 10px; /* More clickable area */
            line-height: 1;
            transition: color 0.2s ease, transform 0.2s ease;
          }

          .chat-header .close-button:hover {
            color: white; /* Solid white on hover */
            transform: translateY(-50%) scale(1.1); /* Slight pop */
          }

          /* --- Chat Messages Area --- */
          .chat-messages {
            flex-grow: 1;
            padding: 20px;
            overflow-y: auto;
            max-height: calc(100% - 140px); /* Adjust based on header and input area height */
            display: flex;
            flex-direction: column;
            gap: 12px; /* Slightly tighter gap */
            background-color: #f7f9fb; /* Light background for chat area */
            /* Optional: Subtle diagonal stripe pattern for texture */
            background-image: linear-gradient(45deg, rgba(0,0,0,.02) 25%, transparent 25%, transparent 50%, rgba(0,0,0,.02) 50%, rgba(0,0,0,.02) 75%, transparent 75%, transparent);
            background-size: 20px 20px;
            border-top: 1px solid #eceff1; /* Subtle border at top */
            border-bottom: 1px solid #eceff1; /* Subtle border at bottom */
          }

          /* Scrollbar Styling (Webkit - Chrome, Safari, Edge) */
          .chat-messages::-webkit-scrollbar {
            width: 8px;
          }
          .chat-messages::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .chat-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
          }
          .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #bbb;
          }

          /* --- Individual Message Bubble --- */
          .message {
            max-width: 80%; /* Allow messages to be a bit wider */
            padding: 12px 18px;
            border-radius: 20px; /* Consistent rounded corners */
            line-height: 1.5;
            font-size: 0.95em;
            word-wrap: break-word;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow for bubbles */
            position: relative; /* For potential future arrow tails */
            border: 1px solid rgba(0,0,0,0.05); /* Very subtle border for crispness */
          }

          /* User Message Specifics */
          .user-message {
            align-self: flex-end;
            background-color: #c9f0a2; /* Brighter, friendly green */
            color: #2e7d32; /* Darker green text */
            border-bottom-right-radius: 5px; /* Pointed corner */
            animation: slideInRight 0.3s ease-out forwards;
          }

          /* Bot Message Specifics */
          .bot-message {
            align-self: flex-start;
            background-color: #e6e9ed; /* Slightly darker light gray */
            color: #4a4a4a; /* Darker gray text */
            border-bottom-left-radius: 5px; /* Pointed corner */
            animation: slideInLeft 0.3s ease-out forwards;
          }

          /* Message entry animations */
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* --- Chat Input Area --- */
          .chat-input-area {
            display: flex;
            padding: 15px 20px;
            border-top: 1px solid #e9ecef;
            gap: 10px;
            align-items: center;
            background-color: #ffffff;
            box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05); /* Shadow above input area */
            border-bottom-left-radius: 20px; /* Match container border-radius */
            border-bottom-right-radius: 20px;
            padding-top: 20px; /* More padding at the top of input area */
          }

          .chat-input-area input[type="text"] {
            flex-grow: 1;
            padding: 12px 18px;
            border: 1px solid #dcdfe4; /* Softer border */
            border-radius: 25px; /* More rounded input */
            font-size: 1em;
            outline: none;
            transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
            background-color: #fcfcfc; /* Very light background */
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.08); /* Inner shadow for depth */
          }

          .chat-input-area input[type="text"]:focus {
            border-color: #aa076b; /* Accent color on focus */
            box-shadow: 0 0 0 3px rgba(170, 7, 107, 0.15), inset 0 1px 3px rgba(0,0,0,0.08); /* Accent shadow */
          }

          /* --- Action Buttons (Send, Upload) --- */
          .action-buttons {
            display: flex;
            gap: 12px; /* Slightly more space between buttons */
          }

          .action-buttons button {
            background: linear-gradient(135deg, #007bff 0%, #00d2ff 100%); /* Bright blue to light blue gradient */
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle white border for depth */
            padding: 14px 22px; /* Increased padding for better feel */
            border-radius: 30px; /* More rounded, pill-like shape */
            cursor: pointer;
            font-size: 1.05em; /* Slightly larger font */
            font-weight: 600; /* Bolder text */
            letter-spacing: 0.5px; /* Subtle spacing */
            text-transform: uppercase; /* Uppercase text */
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Smooth and lively transition */
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3); /* Blue shadow */
          }

          .action-buttons button:hover {
            background: linear-gradient(135deg, #0056b3 0%, #00b0d6 100%); /* Darker gradient on hover */
            transform: translateY(-4px); /* More pronounced lift */
            box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4); /* Enhanced shadow on hover */
          }

          .action-buttons button:active {
            transform: translateY(0); /* Press down effect */
            box-shadow: 0 2px 5px rgba(0, 123, 255, 0.2); /* Smaller shadow when pressed */
          }

          /* --- File Input Button Wrapper (for "Upload Image" button) --- */
          .upload-btn-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
          }
          /* Styling for the actual button that shows "Upload Image" */
          .upload-btn-wrapper .btn-upload {
            /* Inherits general button styles but can be overridden */
            background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%); /* Orange/Yellow gradient for upload */
            box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3); /* Orange shadow */
          }
          .upload-btn-wrapper .btn-upload:hover {
            background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%); /* Darker orange on hover */
            box-shadow: 0 8px 20px rgba(243, 156, 18, 0.4);
          }

          /* Hide the default file input styling completely */
          .upload-btn-wrapper input[type=file] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0; /* Make it completely invisible */
            cursor: pointer;
            width: 100%;
            height: 100%;
            z-index: 2; /* Ensure it's above the fake button */
            border: none; /* Remove any default borders */
            background: transparent; /* Ensure no background */
          }

          /* Basic icon styling - perfected */
          .icon {
            margin-right: 8px; /* More space between icon and text */
            font-size: 1.2em; /* Slightly larger icon */
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Subtle glow on icon */
          }

          /* --- Responsive Adjustments --- */
          @media (max-width: 768px) {
            .chat-container {
              width: 95%;
              right: 2.5%;
              bottom: 20px;
              max-width: unset; /* Allow full width */
              height: 80vh; /* Take more vertical space on small screens */
              border-radius: 15px;
            }

            .toggle-chat-button {
              padding: 15px 25px;
              font-size: 1.1em;
              bottom: 20px;
              right: 20px;
              border-radius: 25px;
            }

            .chat-messages {
              max-height: calc(100% - 120px); /* Adjust max-height for input/header size */
            }

            .chat-input-area {
              flex-direction: column; /* Stack input and buttons */
              gap: 15px;
              padding: 15px;
            }

            .chat-input-area input[type="text"] {
              width: 100%; /* Full width input */
            }

            .action-buttons {
              width: 100%; /* Full width buttons container */
              justify-content: space-around; /* Distribute buttons */
              gap: 10px;
            }

            .action-buttons button {
              flex-grow: 1; /* Allow buttons to expand */
              padding: 12px 15px;
              font-size: 0.95em;
            }
          }

          @media (max-width: 480px) {
            body {
              padding: 10px;
            }
            .chat-container {
              bottom: 10px;
              right: 10px;
            }
            .toggle-chat-button {
              bottom: 10px;
              right: 10px;
              padding: 12px 20px;
              font-size: 1em;
            }
          }
        `}</style>
      </Head>

      {/* Apply your provided inline styles to the main container */}
      <div style={styles.container}>
        <main style={styles.main}>
          <h1 style={styles.heading}>Welcome to Chatbot.ai</h1>

          {/* Links to existing pages */}
          {/* Using the new specific classes for each link */}
          <Link href="/contact" passHref>
            <span className="link-button contact">CONTACT</span>
          </Link>
          <br />
          <Link href="/about" passHref>
            <span className="link-button about">ABOUT</span>
          </Link>
          <br />

          {/* Main button to open/close the chatbot */}
          <button className="toggle-chat-button" onClick={toggleChat}>
            {showChat ? 'Close Chat' : 'Open Chat'}
          </button>
        </main>

        {/* Conditionally render the chatbot widget (it will float based on its fixed positioning) */}
        {showChat && (
          <ChatbotWidget onClose={() => setShowChat(false)} />
        )}
      </div>
    </>
  );
};

export default HomePage;