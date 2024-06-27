import React from 'react';
import { Link } from 'react-router-dom';
import '../utils/menu.css'; // Importar estilos CSS

const MenuComponent = () => {
  return (
    <div className="menu-container">
      <h2 className="menu-title">Menu</h2>
      <nav>
        <ul className="menu-list">
          <li><Link to="/management-user">Manage Users</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/laboratorio">Laboratories</Link></li>
          <li><Link to="/spaces">Spaces</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/password-reset">Password Reset</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuComponent;
