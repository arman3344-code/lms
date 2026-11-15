// Centralized API configuration for Library Portal
// In development, defaults to localhost:8900
// On Render / Production, set REACT_APP_API_URL environment variable (e.g. https://your-backend.onrender.com)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8900";

export default API_URL;
