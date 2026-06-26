export const expenseAPI = {

  getAll: () =>
    api.get("/expenses"),

  create: (data) =>
    api.post("/expenses", data),

  update: (id, data) =>
    api.put(`/expenses/${id}`, data),

  delete: (id) =>
    api.delete(`/expenses/${id}`),
};

export const goalAPI = {

    getAll: () => api.get("/goals"),

    create: (data) => api.post("/goals", data),

    update: (id, data) => api.put(`/goals/${id}`, data),

    delete: (id) => api.delete(`/goals/${id}`)

}

export const portfolioAPI = {
  getAll: () => api.get("/portfolio"),

  create: (data) => api.post("/portfolio", data),

  update: (id, data) => api.put(`/portfolio/${id}`, data),

  delete: (id) => api.delete(`/portfolio/${id}`),
};

export const authAPI = {
  login: (data) => api.post("/login", data),
  register: (data) => api.post("/register", data),
};