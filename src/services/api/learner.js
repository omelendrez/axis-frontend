import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createLearner = (payload) => api.post('/learner', payload)

export const getLearners = (pagination) =>
  api.get(`/learner${setURLParams(pagination)}`)

export const getLearner = (id) => api.get(`/learner/${id}`)

export const getLearnerView = (id) => api.get(`/learner/${id}/view`)

export const updateLearner = (id, payload) => api.put(`/learner/${id}`, payload)

export const deleteLearner = (id) => api.delete(`/learner/${id}`)
