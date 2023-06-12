import { api } from './apiClient'

const endpoint = '/contact-info'

export const createContact = (payload) => api.post(endpoint, payload)

export const getContacts = (id) => api.get(`${endpoint}/${id}/all`)

export const getContact = (id) => api.get(`${endpoint}/${id}`)

export const updateContact = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteContact = (id) => api.delete(`${endpoint}/${id}`)
