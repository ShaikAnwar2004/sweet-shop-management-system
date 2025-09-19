import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryForm from '../components/InventoryForm';
import InventoryViewer from '../components/InventoryViewer';
import SalesForm from '../components/SalesForm';
import ReportViewer from '../components/ReportViewer';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('reports');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setUsername(decoded.sub); // 'sub' is usually the username
    } catch (error) {
      console.error('❌ Invalid token:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>🍬 Sweet Shop Management</h1>
      <p>Welcome, <strong>{username}</strong> ({role})</p>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {role === 'ADMIN' && (
          <>
            <button onClick={() => setActiveTab('inventory')}>Inventory</button>
            <button onClick={() => setActiveTab('sales')}>Sales</button>
          </>
        )}
        <button onClick={() => setActiveTab('reports')}>Reports</button>
        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
          Logout
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        {activeTab === 'inventory' && role === 'ADMIN' && (
          <>
            <InventoryForm />
            <InventoryViewer />
          </>
        )}
        {activeTab === 'sales' && role === 'ADMIN' && <SalesForm />}
        {activeTab === 'reports' && <ReportViewer />}
      </div>
    </div>
  );
}