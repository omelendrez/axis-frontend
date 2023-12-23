import { api } from './assetsClient'

export const getBucketDocumentUrl = (url) => {
  if (import.meta.env.VITE_ASSETS_SOURCE === 'local') {
    return new Promise((resolve) => resolve({ data: url }))
  } else {
    return api.get(url)
  }
}
