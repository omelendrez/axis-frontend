import { getPdfFileName } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'id-cards'

export const getIdCardUrl = (id) =>
  `${url}${endpoint}/${getPdfFileName(id)}?${new Date().getTime()}`

export const generateIdCard = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)

export const idCardExists = (id) =>
  api.get(`${url}${endpoint}/${getPdfFileName(id)}/exists`)
