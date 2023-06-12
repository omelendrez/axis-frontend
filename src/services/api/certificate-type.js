import { setURLParams } from '../../helpers'
import { api } from './apiClient'

const endpoint = '/certificate-type'

export const createCertificateType = (payload) => api.post(endpoint, payload)

export const getCertificateTypes = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCertificateType = (id) => api.get(`${endpoint}/${id}`)

export const updateCertificateType = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCertificateType = (id) => api.delete(`${endpoint}/${id}`)
