import { api } from './assetsClient'
import { getFilename } from '../../helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'certificates'

export const getCertificateUrl = (id) => `${url}${endpoint}/${getFilename(id)}`

export const generateCertificate = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)

export const certificateExists = (id) =>
  api.get(`${endpoint}/${getFilename(id)}/exists`)
