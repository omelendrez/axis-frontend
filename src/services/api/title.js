import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/title'

export const getTitles = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)
