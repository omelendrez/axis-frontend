import { getImageFilename } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'learner-ids'

export const getLearnerIdUrl = (badge) =>
  `${url}${endpoint}/${getImageFilename(badge)}?${new Date().getTime()}`

export const uploadLearnerId = (formData) => api.post(`${endpoint}`, formData)
