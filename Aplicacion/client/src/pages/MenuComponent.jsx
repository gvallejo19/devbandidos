import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MenuComponent = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Menu</h2>
      <nav>
        <ul>
          <li><Link to="/management-user">Manage Users</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/equipos">Equipos</Link></li>
          <li><Link to="/reservaciones">Reservas</Link></li>
          <li><Link to="/laboratorios">Laboratorios</Link></li>
          <li><Link to="/espacios">Spaces</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/password-reset">Password Reset</Link></li>
        </ul>
      </nav>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MenuComponent;

