import { api } from './apiClient'

const endpoint = '/opito'

export const getOpitoRecords = () => api.get(endpoint)
