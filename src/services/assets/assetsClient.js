import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_ASSETS_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
