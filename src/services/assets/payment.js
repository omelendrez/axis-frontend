import { api } from './assetsClient'
import { getScannedDocName } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'payments'

export const getPaymentUrl = (data) =>
  `${url}${endpoint}/${getScannedDocName(data)}?${new Date().getTime()}`

export const uploadPayment = (formData) =>
  api.post(`${url}${endpoint}`, formData)

export const paymentExists = (data) =>
  api.get(`${endpoint}/${getScannedDocName(data)}/exists`)
