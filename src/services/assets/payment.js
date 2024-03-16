import { getScannedDocName } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'payments'

export const getPaymentUrl = (id) =>
  `${url}${endpoint}/${getScannedDocName(id)}?${new Date().getTime()}`

export const uploadPayment = (formData) => api.post(endpoint, formData)
