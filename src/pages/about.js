export default function About() {
  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h2 style={styles.heading}>
          Welcome to my page! This page is all about how you chat with the AI to get information or describe about the image you have uploaded.
        </h2>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2025 Chatbot AI | All Rights Reserved</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to right, #fffde7, #e1f5fe)',
    color: '#333',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main: {
    textAlign: 'center',
    marginTop: '10vh',
    padding: '2rem',
    backgroundColor: '#ffffffcc',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    lineHeight: '1.8',
    color: '#1a237e',
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#e3f2fd',
    borderTop: '1px solid #ccc',
    fontSize: '0.9rem',
    color: '#555',
  },
};