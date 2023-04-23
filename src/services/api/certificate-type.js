import { api } from './apiClient'

export const createCertificateType = (payload) =>
  api.post('/certificate-type', payload)

export const getCertificateTypes = (search) =>
  api.get(`/certificate-type${search ? `?search=${search}` : ''}`)

export const getCertificateType = (id) => api.get(`/certificate-type/${id}`)

export const updateCertificateType = (id, payload) =>
  api.put(`/certificate-type/${id}`, payload)

export const deleteCertificateType = (id) =>
  api.delete(`/certificate-type/${id}`)
