import { api } from './apiClient'

export const createUserRole = (payload) => api.post('/user-role', payload)

export const getUserRoles = (id) => api.get(`/user-role/${id}`)

export const getAvailableRoles = (id) => api.get(`/user-role/${id}/available`)

export const deleteUserRole = (id) => api.delete(`/user-role/${id}`)
