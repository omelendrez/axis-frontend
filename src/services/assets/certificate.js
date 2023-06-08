import { api } from './assetsClient'
import { documentNumber } from '../../helpers'

const url = import.meta.env.VITE_ASSETS_URL

export const getFilename = (id) => `${documentNumber(id)}.pdf`

export const getCertificateUrl = (id) => `${url}certificates/${getFilename(id)}`

export const generateCertificate = (id, payload) =>
  api.post(`certificates/${id}`, payload)

export const certificateExists = (id) =>
  api.get(`certificates/${getFilename(id)}/exists`)
