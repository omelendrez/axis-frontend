import { setURLParams } from '../../helpers'
import { api } from './apiClient'

export const createCourseAssesment = (payload) =>
  api.post('/course-assesment', payload)

export const getCourseAssesments = (pagination) =>
  api.get(`/course-assesment${setURLParams(pagination)}`)

export const getCourseAssesment = (id) => api.get(`/course-assesment/${id}`)

export const updateCourseAssesment = (id, payload) =>
  api.put(`/course-assesment/${id}`, payload)

export const deleteCourseAssesment = (id) =>
  api.delete(`/course-assesment/${id}`)
