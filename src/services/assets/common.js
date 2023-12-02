import { api } from './assetsClient'

export const getBucketDocumentUrl = (url) => api.get(url)
