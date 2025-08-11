// frontend/src/ServicesJS/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change port if backend runs on another
});

export default api;
