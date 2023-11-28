import { api } from './assetsClient'
import { getScannedDocName } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'foets'

export const getFOETUrl = (data) =>
  `${url}${endpoint}/${getScannedDocName(data)}?${new Date().getTime()}`

export const uploadFOET = (formData) => api.post(`${url}${endpoint}`, formData)

export const foetExists = (data) =>
  api.get(`${endpoint}/${getScannedDocName(data)}/exists`)
