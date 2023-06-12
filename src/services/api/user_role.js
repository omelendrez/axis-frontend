import { api } from './apiClient'

const endpoint = '/user-role'

export const createUserRole = (payload) => api.post(endpoint, payload)

export const getUserRoles = (id) => api.get(`${endpoint}/${id}`)

export const getAvailableRoles = (id) => api.get(`${endpoint}/${id}/available`)

export const deleteUserRole = (id) => api.delete(`${endpoint}/${id}`)
