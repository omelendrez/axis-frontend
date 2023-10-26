import { api } from './assetsClient'
import { getImageFilename } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'pictures'

export const getPhotoUrl = (badge) =>
  `${url}${endpoint}/${badge}.jpg?${new Date().getTime()}`

export const uploadPhoto = (formData) => api.post(`${url}${endpoint}`, formData)

export const pictureExists = (id) =>
  api.get(`${endpoint}/${getImageFilename(id)}/exists`)
