import { setURLParams } from '../../helpers'
import { api } from './apiClient'

const endpoint = '/training'

export const createTraining = (payload) => api.post(endpoint, payload)

export const getTrainings = (id) => api.get(`${endpoint}/${id}/all`)

export const getTrainingsByClassroom = (id, pagination) =>
  api.get(`${endpoint}/${id}/classroom${setURLParams(pagination)}`)

export const getTrainingView = (id) => api.get(`${endpoint}/${id}/view`)

export const getTracking = (id) => api.get(`${endpoint}/${id}/tracking`)

export const getTraining = (id) => api.get(`${endpoint}/${id}`)

export const updateTraining = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteTraining = (id) => api.delete(`${endpoint}/${id}`)
