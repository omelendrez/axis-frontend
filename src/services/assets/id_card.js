import { api } from './assetsClient'
import { getFilename } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'id-cards'

export const getIdCardUrl = (id) => `${url}${endpoint}/${getFilename(id)}`

export const generateIdCard = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)

export const idCardExists = (id) =>
  api.get(`${endpoint}/${getFilename(id)}/exists`)
