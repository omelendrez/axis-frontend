import { api } from './assetsClient'

const url = import.meta.env.VITE_ASSETS_URL

export const getIdCardUrl = (id) => `${url}id_cards/${id.toString(16)}.pdf`

export const generateIdCard = (id, payload) =>
  api.post(`generate-id-card/${id}`, payload)
