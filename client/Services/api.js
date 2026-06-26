import axios from "axios";

/**
 * Axios instance
 * Connects React frontend to FastAPI backend
 */
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach JWT token automatically to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * AUTH APIs
 */
export const authAPI = {
  login: (data) => api.post("/login", data),
  register: (data) => api.post("/register", data),
};

/**
 * EXPENSE APIs
 */
export const expenseAPI = {
  getAll: () => api.get("/expenses"),
  create: (data) => api.post("/expenses", data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

/**
 * GOAL APIs
 */
export const goalAPI = {
  getAll: () => api.get("/goals"),
  create: (data) => api.post("/goals", data),
  update: (id, data) => api.put(`/goals/${id}`, data),
  delete: (id) => api.delete(`/goals/${id}`),
};

/**
 * PORTFOLIO APIs
 */
export const portfolioAPI = {
  getAll: () => api.get("/portfolio"),
  create: (data) => api.post("/portfolio", data),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`),
};

/**
 * Optional: export axios instance for direct usage
 */
export default api;