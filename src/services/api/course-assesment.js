import { setURLParams } from '../../helpers'
import { api } from './apiClient'

const endpoint = '/course-assesment'

export const createCourseAssesment = (payload) => api.post(endpoint, payload)

export const getCourseAssesments = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCourseAssesment = (id) => api.get(`${endpoint}/${id}`)

export const updateCourseAssesment = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCourseAssesment = (id) => api.delete(`${endpoint}/${id}`)
