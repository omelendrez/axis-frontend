import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createStatus = (payload) => api.post('/status', payload)

export const getStatuses = (pagination) =>
  api.get(`/status${setURLParams(pagination)}`)

export const getStatus = (id) => api.get(`/status/${id}`)

export const updateStatus = (id, payload) => api.put(`/status/${id}`, payload)

export const deleteStatus = (id) => api.delete(`/status/${id}`)
