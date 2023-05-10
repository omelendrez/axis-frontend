import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createCourseItem = (payload) => api.post('/course-item', payload)

export const getCourseItems = (pagination) =>
  api.get(`/course-item${setURLParams(pagination)}`)

export const getCourseItem = (id) => api.get(`/course-item/${id}`)

export const updateCourseItem = (id, payload) =>
  api.put(`/course-item/${id}`, payload)

export const deleteCourseItem = (id) => api.delete(`/course-item/${id}`)
