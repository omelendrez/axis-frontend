import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createCourse = (payload) => api.post('/course', payload)

export const getCourses = (pagination) =>
  api.get(`/course${setURLParams(pagination)}`)

export const getCourse = (id) => api.get(`/course/${id}`)

export const getCourseView = (id) => api.get(`/course/${id}/view`)

export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)

export const deleteCourse = (id) => api.delete(`/course/${id}`)
