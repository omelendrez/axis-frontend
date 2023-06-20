import { getImageFilename } from '@/helpers'
import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'learner_ids'

export const getLearnerIdUrl = (badge) => `${url}${endpoint}/${badge}.jpg`

export const uploadLearnerId = (formData) =>
  api.post(`${url}${endpoint}`, formData)

export const learnerIdCardExists = (id) =>
  api.get(`${endpoint}/${getImageFilename(id)}/exists`)
