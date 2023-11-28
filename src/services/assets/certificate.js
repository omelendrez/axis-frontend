import { api } from './assetsClient'
import { getPdfFileName } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'certificates'

export const getCertificateUrl = (id) =>
  `${url}${endpoint}/${getPdfFileName(id)}`

export const generateCertificate = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)

export const certificateExists = (id) =>
  api.get(`${endpoint}/${getPdfFileName(id)}/exists`)
