import { api } from './assetsClient'
import { getPdfFileName } from '@/helpers'

const endpoint = 'email'

export const sendWelcomeLetter = (id, payload) =>
  api.post(`${endpoint}/welcome-letter`, {
    ...payload,
    filename: getPdfFileName(id)
  })
