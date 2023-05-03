import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createTrainee = (payload) => api.post('/trainee', payload)

export const getTrainees = (pagination) =>
  api.get(`/trainee${setURLParams(pagination)}`)

export const getTrainee = (id) => api.get(`/trainee/${id}`)

export const getTraineeView = (id) => api.get(`/trainee/${id}/view`)

export const updateTrainee = (id, payload) => api.put(`/trainee/${id}`, payload)

export const deleteTrainee = (id) => api.delete(`/trainee/${id}`)
