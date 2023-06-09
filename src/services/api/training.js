import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createTraining = (payload) => api.post('/training', payload)

export const getTrainings = (id) => api.get(`/training/${id}/all`)

export const getTrainingsByClassroom = (id, pagination) =>
  api.get(`/training/${id}/classroom${setURLParams(pagination)}`)

export const getTrainingView = (id) => api.get(`/training/${id}/view`)

export const getTracking = (id) => api.get(`/training/${id}/tracking`)

export const getTraining = (id) => api.get(`/training/${id}`)

export const updateTraining = (id, payload) =>
  api.put(`/training/${id}`, payload)

export const deleteTraining = (id) => api.delete(`/training/${id}`)
