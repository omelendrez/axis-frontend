import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createState = (payload) => api.post('/state', payload)

export const getStates = (pagination) =>
  api.get(`/state${setURLParams(pagination)}`)

export const getState = (id) => api.get(`/state/${id}`)

export const updateState = (id, payload) => api.put(`/state/${id}`, payload)

export const deleteState = (id) => api.delete(`/state/${id}`)
