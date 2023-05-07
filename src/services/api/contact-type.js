import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createContactType = (payload) => api.post('/contact-type', payload)

export const getContactTypes = (pagination) =>
  api.get(`/contact-type${setURLParams(pagination)}`)

export const getContactType = (id) => api.get(`/contact-type/${id}`)

export const updateContactType = (id, payload) =>
  api.put(`/contact-type/${id}`, payload)

export const deleteContactType = (id) => api.delete(`/contact-type/${id}`)
