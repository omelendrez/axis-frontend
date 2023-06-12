import { api } from './apiClient'

const endpoint = '/course-assesment-rel'

export const createCourseAssesmentRel = (payload) => api.post(endpoint, payload)

export const getCourseAssesmentsRel = (id) => api.get(`${endpoint}/${id}`)

export const getCourseAvailableAssesments = (id) =>
  api.get(`${endpoint}/${id}/available`)

export const deleteCourseAssesmentRel = (id) => api.delete(`${endpoint}/${id}`)
