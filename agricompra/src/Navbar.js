import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          Agricompra
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/ProductosPage">Productos</Link>
        <a href="/Carrito">Carrito</a>
        <Link to="/Account">Cuenta</Link>
      </div>
    </nav>
  );
}

export default Navbar;