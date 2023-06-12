import { api } from './apiClient'

import { setURLParams } from '../../helpers'

const endpoint = '/company'

export const createCompany = (payload) => api.post(endpoint, payload)

export const getCompanies = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCompany = (id) => api.get(`${endpoint}/${id}`)

export const updateCompany = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCompany = (id) => api.delete(`${endpoint}/${id}`)
