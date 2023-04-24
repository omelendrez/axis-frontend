import { api } from './apiClient'

export const createTrainee = (payload) => api.post('/trainee', payload)

export const getTrainees = ({ search, limit, offset }) =>
  api.get(`/trainee?search=${search}&limit=${limit}&offset=${offset}`)

export const getTrainee = (id) => api.get(`/trainee/${id}`)

export const updateTrainee = (id, payload) => api.put(`/trainee/${id}`, payload)

export const deleteTrainee = (id) => api.delete(`/trainee/${id}`)
