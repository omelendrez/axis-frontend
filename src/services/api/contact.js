import { api } from './apiClient'

export const createContact = (payload) => api.post('/contact-info', payload)

export const getContacts = (id) => api.get(`/contact-info/${id}/all`)

export const getContact = (id) => api.get(`/contact-info/${id}`)

export const updateContact = (id, payload) =>
  api.put(`/contact-info/${id}`, payload)

export const deleteContact = (id) => api.delete(`/contact-info/${id}`)
