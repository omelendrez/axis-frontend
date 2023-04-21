import { api } from './apiClient'

export const createState = (payload) => api.post('/state', payload)

export const getStates = (search) =>
  api.get(`/state${search ? `?search=${search}` : ''}`)

export const getState = (id) => api.get(`/state/${id}`)

export const updateState = (id, payload) => api.put(`/state/${id}`, payload)

export const deleteState = (id) => api.delete(`/state/${id}`)
