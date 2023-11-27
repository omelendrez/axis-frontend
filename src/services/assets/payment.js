import { api } from './assetsClient'
import { getPaymentFilename } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'payments'

export const getPaymentUrl = (data) =>
  `${url}${endpoint}/${getPaymentFilename(data)}?${new Date().getTime()}`

export const uploadPayment = (formData) =>
  api.post(`${url}${endpoint}`, formData)

export const paymentExists = (data) =>
  api.get(`${endpoint}/${getPaymentFilename(data).toUpperCase()}/exists`)
