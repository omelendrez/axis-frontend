import { api } from './apiClient'

export const createContactInfo = (payload) => api.post('/contact-info', payload)

export const getContactInfos = (id) => api.get(`/contact-info/${id}/all`)

export const getContactInfo = (id) => api.get(`/contact-info/${id}`)

export const updateContactInfo = (id, payload) =>
  api.put(`/contact-info/${id}`, payload)

export const deleteContactInfo = (id) => api.delete(`/contact-info/${id}`)
