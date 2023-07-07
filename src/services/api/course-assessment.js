import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/course-assessment'

export const createCourseAssessment = (payload) => api.post(endpoint, payload)

export const getCourseAssessments = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCourseAssessment = (id) => api.get(`${endpoint}/${id}`)

export const updateCourseAssessment = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCourseAssessment = (id) => api.delete(`${endpoint}/${id}`)
