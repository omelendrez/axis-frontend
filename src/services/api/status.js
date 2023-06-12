import { setURLParams } from '../../helpers'
import { api } from './apiClient'

const endpoint = '/status'

export const createStatus = (payload) => api.post(endpoint, payload)

export const getStatuses = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getStatus = (id) => api.get(`${endpoint}/${id}`)

export const updateStatus = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteStatus = (id) => api.delete(`${endpoint}/${id}`)
