import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:3307';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State for password reset
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/menu', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      try {
        const payload = { nombre: name, email, contraseña: password, tipo_usuario: tipoUsuario };
        const response = await axios.post(`${API_URL}/usuarios`, payload);
        login(response.data);
        navigate('/menu', { replace: true });
      } catch (error) {
        console.error('Registration error:', error);
        setError('Registration failed. Please try again.');
      }
    } else {
      try {
        const payload = { email, password };
        const response = await axios.post(`${API_URL}/usuarios/login`, payload);
        login(response.data);
        navigate('/menu', { replace: true });
      } catch (error) {
        console.error('Login error:', error);
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  const handleSubmitReset = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/usuarios/reset-password`, { email: resetEmail });
      setResetMessage(response.data.message);
      setResetError('');
    } catch (error) {
      setResetMessage('');
      setResetError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <div>
              <label>Name</label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Tipo de Usuario</label>
              <input type='text' value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} required />
            </div>
          </>
        )}
        <div>
          <label>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit'>{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>

      {/* Password Reset Form */}
      <div>
        <h2>Reset Password</h2>
        {resetMessage && <p style={{ color: 'green' }}>{resetMessage}</p>}
        {resetError && <p style={{ color: 'red' }}>{resetError}</p>}
        <form onSubmit={handleSubmitReset}>
          <div>
            <label>Email</label>
            <input type='email' value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
          </div>
          <button type='submit'>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;

