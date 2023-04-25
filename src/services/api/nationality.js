import { api } from './apiClient'

export const createNationality = (payload) => api.post('/nationality', payload)

export const getNationalities = ({ search, limit, offset }) =>
  api.get(`/nationality?search=${search}&limit=${limit}&offset=${offset}`)
export const getNationality = (id) => api.get(`/nationality/${id}`)

export const updateNationality = (id, payload) =>
  api.put(`/nationality/${id}`, payload)

export const deleteNationality = (id) => api.delete(`/nationality/${id}`)
