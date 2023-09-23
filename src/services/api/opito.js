import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/opito'

export const getOpitoRecords = () => api.get(endpoint)

export const getOpitoFileList = (pagination) =>
  api.get(`${endpoint}/file${setURLParams(pagination)}`)
