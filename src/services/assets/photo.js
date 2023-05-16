import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

export const getPhoto = (badge) => `${url}/pictures/${badge}.jpg`

export const upload = (payload) => api.post(url, payload)
