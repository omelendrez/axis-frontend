import { api } from './assetsClient'
import { getFilename } from '@/helpers'

const url = import.meta.env.VITE_ASSETS_URL

const endpoint = 'welcome-letter'

export const getWelcomeLetterUrl = (id) =>
  `${url}${endpoint}/${getFilename(id)}`

export const generateWelcomeLetter = (id, payload) =>
  api.post(`${endpoint}/${id}`, payload)

export const welcomeLetterExists = (id) =>
  api.get(`${endpoint}/${getFilename(id)}/exists`)
