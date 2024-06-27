import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../utils/login.css"; // Importar estilos CSS

const API_URL = 'http://localhost:3307';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      await handleRegistration();
    } else {
      await handleLogin();
    }
  };

  // Maneja el registro de usuario
  const handleRegistration = async () => {
    try {
      const payload = { nombre: name, email, contraseña: password, tipo_usuario: tipoUsuario };
      console.log('Registering user with payload:', payload);
      const response = await axios.post(`${API_URL}/usuarios`, payload);
      console.log('Registration response:', response.data); // Log response
      login(response.data);
      navigate('/menu'); // Redirige al menú después de registrarse
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  // Maneja el inicio de sesión
  const handleLogin = async () => {
    try {
      const payload = { email, password };
      console.log('Logging in user with payload:', payload);
      const response = await axios.post(`${API_URL}/usuarios/login`, payload);
      console.log('Login response:', response.data); // Log response
      login(response.data);
      navigate('/menu'); // Redirige al menú después de iniciar sesión
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  // Alternar entre registro y login
  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
    setError(''); // Reiniciar mensaje de error al cambiar modo
  };

  return (
    <div className="container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <p className="error-message">{error}</p>}
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
      <button className="toggle-button" onClick={handleToggleMode}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default LoginComponent;

