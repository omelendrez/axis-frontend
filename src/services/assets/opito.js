import { api } from './assetsClient'

const endpoint = 'opito'

export const generateOpitoCertificate = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)
