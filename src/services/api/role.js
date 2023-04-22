import { api } from './apiClient'

export const createRole = (payload) => api.post('/role', payload)

export const getRoles = (search) =>
  api.get(`/role${search ? `?search=${search}` : ''}`)

export const getRole = (id) => api.get(`/role/${id}`)

export const updateRole = (id, payload) => api.put(`/role/${id}`, payload)

export const deleteRole = (id) => api.delete(`/role/${id}`)
