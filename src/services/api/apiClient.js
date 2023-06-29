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

// TODO: Handle camelCase and snake-case conversion between fe and api and vice-versa

api.interceptors.request.use(
  (config) => {
    const controller = new AbortController()
    const token = session.get(KEYS.token)

    console.log(config)

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
  (response) => {
    const index = pending.indexOf(response.config.url)
    pending.splice(index, 1)

    return response
  },
  (error) => {
    const index = pending.indexOf(error.config.url)
    pending.splice(index, 1)
    return Promise.reject(error)
  }
)
