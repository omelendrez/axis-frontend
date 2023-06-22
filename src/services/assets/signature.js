import { api } from './assetsClient'
import { getSignatureFilename } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'signatures'

export const getSignatureUrl = (data) =>
  `${url}${endpoint}/${getSignatureFilename(data)}`

export const uploadSignature = (formData) =>
  api.post(`${url}${endpoint}`, formData)

export const signatureExists = (data) =>
  api.get(`${endpoint}/${getSignatureFilename(data)}/exists`)
