import { api } from './apiClient'

export const createCompany = (payload) => api.post('/company', payload)

export const getCompanies = (search) =>
  api.get(`/company${search ? `?search=${search}` : ''}`)

export const getCompany = (id) => api.get(`/company/${id}`)

export const updateCompany = (id, payload) => api.put(`/company/${id}`, payload)

export const deleteCompany = (id) => api.delete(`/company/${id}`)
