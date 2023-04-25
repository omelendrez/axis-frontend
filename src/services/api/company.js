import { api } from './apiClient'

export const createCompany = (payload) => api.post('/company', payload)

export const getCompanies = ({ search, limit, offset }) =>
  api.get(`/company?search=${search}&limit=${limit}&offset=${offset}`)

export const getCompany = (id) => api.get(`/company/${id}`)

export const updateCompany = (id, payload) => api.put(`/company/${id}`, payload)

export const deleteCompany = (id) => api.delete(`/company/${id}`)
