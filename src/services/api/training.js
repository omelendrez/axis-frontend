import { api } from './apiClient'

export const createTraining = (payload) => api.post('/training', payload)

export const getTrainings = (id) => api.get(`/training/${id}/all`)

export const getTraining = (id) => api.get(`/training/${id}`)

export const updateTraining = (id, payload) =>
  api.put(`/training/${id}`, payload)

export const deleteTraining = (id) => api.delete(`/training/${id}`)