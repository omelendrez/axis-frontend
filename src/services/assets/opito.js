import { api } from './assetsClient'

const endpoint = 'opito'

export const generateOpitoCertificate = (payload) => api.post(endpoint, payload)
