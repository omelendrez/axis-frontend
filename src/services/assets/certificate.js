import { getPdfFileName } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'certificates'

export const getCertificateUrl = (id) =>
  `${url}${endpoint}/${getPdfFileName(id)}?${new Date().getTime()}`

export const generateCertificate = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)

export const certificateExists = (id) =>
  api.get(`${url}${endpoint}/${getPdfFileName(id)}/exists`)
