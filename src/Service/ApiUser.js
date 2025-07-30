import axios from "axios";

// CRA (react-scripts) ➜ variables d'env doivent commencer par REACT_APP_
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001";
const api = axios.create({
  baseURL: `${API_BASE}/users`,
  // headers: { "Content-Type": "application/json" }, // axios le met par défaut
});

// Endpoints
export async function getAllUsers() {
  return await api.get("/getAllUsers");
}

export async function getUserById(userId) {
  return await api.get(`/getUserById/${userId}`);
}

export async function deleteUser(id) {
  return await api.delete(`/deleteUser/${id}`);
}

export async function addUserClient(userData) {
  return await api.post(`/addUserClient`, userData);
}

export async function updateuserById(userId, userData) {
  return await api.put(`/updateuserById/${userId}`, userData);
}
