import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍬 Sweet Shop</h2>
      <div className="nav-links">
       <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/1">Dashboard 1</Link>
        <Link to="/dashboard/2">Dashboard 2</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/sales">Sales</Link>
      </div>
    </nav>
  );
}