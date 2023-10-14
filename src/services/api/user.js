import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/user'

export const login = (payload) => api.post(`${endpoint}/login`, payload)

export const createUser = (payload) => api.post(endpoint, payload)

export const getUsers = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getUser = (id) => api.get(`${endpoint}/${id}`)

export const getUserView = (id) => api.get(`${endpoint}/${id}/view`)

export const updateUser = (id, payload) => api.put(`${endpoint}/${id}`, payload)

export const changePassword = (id, payload) =>
  api.put(`${endpoint}/${id}/chgpwd`, payload)

export const resetPassword = (id) => api.post(`${endpoint}/${id}/reset`)

export const deleteUser = (id) => api.delete(`${endpoint}/${id}`)
