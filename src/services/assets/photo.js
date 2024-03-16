import { getImageFilename } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'pictures'

export const getPhotoUrl = (badge) =>
  `${url}${endpoint}/${getImageFilename(badge)}?${new Date().getTime()}`

export const uploadPhoto = (formData) => api.post(`${url}${endpoint}`, formData)

export const getPictureExists = (id) =>
  api.get(`${url}${endpoint}/${getImageFilename(id)}/exists`)
