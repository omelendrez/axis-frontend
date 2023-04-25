import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createRole = (payload) => api.post('/role', payload)

export const getRoles = (pagination) =>
  api.get(`/role${setURLParams(pagination)}`)

export const getRole = (id) => api.get(`/role/${id}`)

export const updateRole = (id, payload) => api.put(`/role/${id}`, payload)

export const deleteRole = (id) => api.delete(`/role/${id}`)
