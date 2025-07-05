import axios from 'axios';

const API_URL = 'http://localhost:4000';

// Orders
export const getOrders = () => axios.get(`${API_URL}/orders`);
export const addOrder = (data) => axios.post(`${API_URL}/orders`, data);
export const updateOrder = (id, data) => axios.put(`${API_URL}/orders/${id}`, data);
export const deleteOrder = (id) => axios.delete(`${API_URL}/orders/${id}`);

// Applicants
export const getApplicants = () => axios.get(`${API_URL}/applicants`);
export const addApplicant = (data) => axios.post(`${API_URL}/applicants`, data);
export const updateApplicant = (id, data) => axios.put(`${API_URL}/applicants/${id}`, data);
export const deleteApplicant = (id) => axios.delete(`${API_URL}/applicants/${id}`);

// Products
export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (data) => axios.post(`${API_URL}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);

// Staff
export const getStaff = () => axios.get(`${API_URL}/staff`);
export const addStaff = (data) => axios.post(`${API_URL}/staff`, data);
export const updateStaff = (id, data) => axios.put(`${API_URL}/staff/${id}`, data);
export const deleteStaff = (id) => axios.delete(`${API_URL}/staff/${id}`); 