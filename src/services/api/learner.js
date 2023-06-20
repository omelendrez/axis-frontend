import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/learner'

export const createLearner = (payload) => api.post(endpoint, payload)

export const getLearners = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getLearner = (id) => api.get(`${endpoint}/${id}`)

export const getLearnerView = (id) => api.get(`${endpoint}/${id}/view`)

export const updateLearner = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteLearner = (id) => api.delete(`${endpoint}/${id}`)
