import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import InventoryForm from './components/InventoryForm';
import SalesForm from './components/SalesForm';
import ReportViewer from './components/ReportViewer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const isLoggedIn = !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
         <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
  
        <Route path="/reports/:id" element={isLoggedIn ? <ReportViewer /> : <Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryForm />} />
          <Route path="/sales" element={<SalesForm />} />
          <Route path="/reports" element={<ReportViewer />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;