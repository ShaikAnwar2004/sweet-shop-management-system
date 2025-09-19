import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Update if needed

export const getInventory = () => axios.get(`${BASE_URL}/inventory`);
export const addSweet = (sweet) => axios.post(`${BASE_URL}/inventory`, sweet);
export const updateSweet = (id, sweet) => axios.put(`${BASE_URL}/inventory/${id}`, sweet);
export const deleteSweet = (id) => axios.delete(`${BASE_URL}/inventory/${id}`);

export const recordSale = (sale) => axios.post(`${BASE_URL}/sales`, sale);
export const getReports = () => axios.get(`${BASE_URL}/reports`);