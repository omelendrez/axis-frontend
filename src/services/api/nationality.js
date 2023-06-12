import { setURLParams } from '../../helpers'
import { api } from './apiClient'

const endpoint = '/nationality'

export const createNationality = (payload) => api.post(endpoint, payload)

export const getNationalities = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getNationality = (id) => api.get(`${endpoint}/${id}`)

export const updateNationality = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteNationality = (id) => api.delete(`${endpoint}/${id}`)
