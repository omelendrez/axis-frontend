import { api } from './apiClient'

const endpoint = '/instructor'

export const createInstructor = (payload) => api.post(`${endpoint}`, payload)

export const deleteInstructor = (id) => api.delete(`${endpoint}/${id}`)
