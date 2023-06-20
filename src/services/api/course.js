import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/course'

export const createCourse = (payload) => api.post(endpoint, payload)

export const getCourses = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCourse = (id) => api.get(`${endpoint}/${id}`)

export const getCourseView = (id) => api.get(`${endpoint}/${id}/view`)

export const updateCourse = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCourse = (id) => api.delete(`${endpoint}/${id}`)
