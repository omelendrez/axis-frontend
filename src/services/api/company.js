import { api } from './apiClient'

import { setURLParams } from '../../helpers'

export const createCompany = (payload) => api.post('/company', payload)

export const getCompanies = (pagination) =>
  api.get(`/company${setURLParams(pagination)}`)

export const getCompany = (id) => api.get(`/company/${id}`)

export const updateCompany = (id, payload) => api.put(`/company/${id}`, payload)

export const deleteCompany = (id) => api.delete(`/company/${id}`)
