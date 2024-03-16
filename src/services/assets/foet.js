import { getScannedDocName } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'foets'

export const getFOETUrl = (id) =>
  `${url}${endpoint}/${getScannedDocName(id)}?${new Date().getTime()}`

export const uploadFOET = (formData) => api.post(endpoint, formData)
