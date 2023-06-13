import { api } from './apiClient'

const endpoint = '/approvals'

export const financeApproval = (id, payload) =>
  api.post(`${endpoint}/finance/${id}`, payload)

export const undo = (id) => api.post(`${endpoint}/finance/${id}/cancel`)
