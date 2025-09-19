import React, { useState } from 'react';
import axios from 'axios';
import './InventoryForm.css';

export default function InventoryForm() {
  const [sweet, setSweet] = useState({ name: '', price: '', stock: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSweet((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ Unauthorized: Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/sweets/add', sweet, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage('✅ Sweet added successfully!');
      setSweet({ name: '', price: '', stock: '' });
    } catch (error) {
      console.error('Error adding sweet:', error);
      if (error.response?.status === 403) {
        setMessage('❌ Access denied: Only admins can add sweets.');
      } else {
        setMessage('❌ Failed to add sweet. Please check your input or server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Sweet</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Sweet Name"
          value={sweet.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price (INR)"
          value={sweet.price}
          onChange={handleChange}
          required
          min="1"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Count"
          value={sweet.stock}
          onChange={handleChange}
          required
          min="0"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Sweet'}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}