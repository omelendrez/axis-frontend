import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/state'

export const createState = (payload) => api.post(endpoint, payload)

export const getStates = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getState = (id) => api.get(`${endpoint}/${id}`)

export const updateState = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteState = (id) => api.delete(`${endpoint}/${id}`)
