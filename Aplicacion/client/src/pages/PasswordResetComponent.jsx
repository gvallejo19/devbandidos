import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/usuarios/reset-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type='submit'>Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetComponent;
