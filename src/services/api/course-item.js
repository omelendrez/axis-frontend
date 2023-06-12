import { setURLParams } from '../../helpers'
import { api } from './apiClient'

const endpoint = '/course-item'

export const createCourseItem = (payload) => api.post(endpoint, payload)

export const getCourseItems = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCourseItem = (id) => api.get(`${endpoint}/${id}`)

export const updateCourseItem = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCourseItem = (id) => api.delete(`${endpoint}/${id}`)
