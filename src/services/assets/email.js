import { api } from './assetsClient'
import { getFilename } from '@/helpers'

const endpoint = 'email'

export const sendWelcomeLetter = (id, payload) =>
  api.post(`${endpoint}/welcome-letter`, {
    ...payload,
    filename: getFilename(id)
  })
