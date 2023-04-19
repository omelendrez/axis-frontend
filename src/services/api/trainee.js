import { api } from "./apiClient";

export const createTrainee = (payload) => api.post("/trainee", payload);

export const getTrainees = (search) =>
  api.get(`/trainee${search ? `?search=${search}` : ""}`);

export const getTrainee = (id) => api.get(`/trainee/${id}`);

export const updateTrainee = (id, payload) =>
  api.put(`/trainee/${id}`, payload);

export const deleteTrainee = (id) => api.delete(`/trainee/${id}`);
