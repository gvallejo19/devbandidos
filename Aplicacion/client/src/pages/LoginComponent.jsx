import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../utils/login.css'; // Importa tus estilos CSS aquí

const API_URL = 'http://localhost:3307';

const PasswordResetLink = ({ onClick }) => (
  <p className="password-reset-link" onClick={onClick}>
    ¿Olvidaste tu contraseña?
  </p>
);

const PasswordResetForm = ({ onSubmit, resetEmail, setResetEmail, resetMessage, resetError }) => (
  <div className="password-reset-container">
    <h2>Resetear Contraseña</h2>
    {resetMessage && <p className="success-message">{resetMessage}</p>}
    {resetError && <p className="error-message">{resetError}</p>}
    <form onSubmit={onSubmit}>
      <div>
        <label>Email</label>
        <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
      </div>
      <button type="submit">Resetear Contraseña</button>
    </form>
  </div>
);

const LoginComponent = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');

  // State for password reset
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

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
    <div className="login-container">
      <div className="login-box">
        <h1>{isRegistering ? 'Registro' : 'Inicio de sesión'}</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label>Tipo de Usuario</label>
                <input type="text" value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} required />
              </div>
            </>
          )}
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{isRegistering ? 'Registrar' : 'Iniciar sesión'}</button>
        </form>
        <button className="switch-button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Cambiar a Iniciar sesión' : 'Cambiar a Registro'}
        </button>
      </div>

      {showResetForm ? (
        <PasswordResetForm
          onSubmit={handleSubmitReset}
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          resetMessage={resetMessage}
          resetError={resetError}
        />
      ) : (
        <PasswordResetLink onClick={() => setShowResetForm(true)} />
      )}
    </div>
  );
};

export default LoginComponent;


