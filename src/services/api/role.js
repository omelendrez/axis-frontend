import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/role'

export const createRole = (payload) => api.post(endpoint, payload)

export const getRoles = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getRole = (id) => api.get(`${endpoint}/${id}`)

export const updateRole = (id, payload) => api.put(`${endpoint}/${id}`, payload)

export const deleteRole = (id) => api.delete(`${endpoint}/${id}`)
