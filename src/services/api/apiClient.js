import axios from 'axios'
import { KEYS, SP } from '../session'

const session = new SP()
const pending = [] // we keep track of request made in order to abort when it was already fired

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

/**
 *
 * @param {string} url
 *
 * @description Remove url from the pending requests array, so a new request can be launched
 */

const removeUrlFromPending = (url) => {
  const index = pending.indexOf(url)
  if (index) {
    pending.splice(index, 1)
  }
}

api.interceptors.request.use(
  (config) => {
    const controller = new AbortController()
    const token = session.get(KEYS.token)

    if (pending.includes(config.url)) {
      // This url has already been queried and no response/error received yet
      // So we cancel this new request
      controller.abort()
    } else {
      // We add the url to the pending responses
      if (config.url !== '/user/login') {
        pending.push(config.url)
      }
    }

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return { ...config, signal: controller.signal }
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    const { config } = response
    // Response received, so we can remove the url from pending
    removeUrlFromPending(config.url)
    return response
  },
  (error) => Promise.reject(error)
)
