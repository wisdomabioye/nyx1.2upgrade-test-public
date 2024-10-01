import { useState } from 'react';
import axios from 'axios';

const Whale = () => {
  const [interval, setInterval] = useState(5); // Default to 5 minutes
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setInterval(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/whale/set-interval', { interval });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error setting the interval.');
    }
  };

  // Inline dark mode styles
  const appStyles = {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyles = {
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #444',
    padding: '8px',
    marginLeft: '10px',
    borderRadius: '4px',
  };

  const buttonStyles = {
    backgroundColor: '#444',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const buttonHoverStyles = {
    backgroundColor: '#555',
  };

  const messageStyles = {
    color: '#4caf50',
    marginTop: '10px',
    fontSize: '1.2rem',
  };

  return (
    <div style={appStyles}>
      <h1>Binance Whale Monitor</h1>
      <div>
        <label>
          Set Monitoring Interval (minutes):
          <input
            type="number"
            value={interval}
            onChange={handleInputChange}
            min="1"
            style={inputStyles}
          />
        </label>
        <button
          onClick={handleSubmit}
          style={buttonStyles}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyles.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyles.backgroundColor}
        >
          Set Interval
        </button>
      </div>
      {message && <p style={messageStyles}>{message}</p>}
    </div>
  );
};

export default Whale;
