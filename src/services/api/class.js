import { api } from './apiClient'

import { setURLParams } from '../../helpers'

export const createClass = (payload) => api.post('/class', payload)

export const getClasses = (pagination) =>
  api.get(`/class${setURLParams(pagination)}`)

export const getClass = (id) => api.get(`/class/${id}`)

export const updateClass = (id, payload) => api.put(`/class/${id}`, payload)

export const deleteClass = (id) => api.delete(`/class/${id}`)
