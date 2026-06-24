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