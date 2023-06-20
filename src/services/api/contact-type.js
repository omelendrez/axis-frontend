import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/contact-type'

export const createContactType = (payload) => api.post(endpoint, payload)

export const getContactTypes = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getContactType = (id) => api.get(`${endpoint}/${id}`)

export const updateContactType = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteContactType = (id) => api.delete(`${endpoint}/${id}`)
