import { api } from './apiClient'

const endpoint = '/backup'

const backup = {
  backup: () =>
    api.post(`${endpoint}/backup`, {
      onUploadProgress: (progressEvent) => console.log(progressEvent.loaded)
    }),
  zip: () => api.post(`${endpoint}/zip`),
  push: () => api.post(`${endpoint}/push`),
  unzip: () => api.post(`${endpoint}/unzip`),
  restore: () => api.post(`${endpoint}/restore`),
  test: () => api.post(`${endpoint}/test`)
}

export default backup
