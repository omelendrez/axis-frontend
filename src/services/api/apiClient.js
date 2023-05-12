import axios from 'axios'
import { KEYS, SP } from '../session'

const session = new SP()
const pending = []

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const controller = new AbortController()
    const token = session.get(KEYS.token)

    if (pending.includes(config.url)) {
      controller.abort()
    } else {
      pending.push(config.url)
    }

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return { ...config, signal: controller.signal }
  },
  (error) => {
    Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    const index = pending.indexOf(response.config.url)
    pending.splice(index, 1)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
