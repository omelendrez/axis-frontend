import { api } from './apiClient'

const endpoint = '/course-assessment-rel'

export const createCourseAssessmentRel = (payload) =>
  api.post(endpoint, payload)

export const getCourseAssessmentsRel = (id) => api.get(`${endpoint}/${id}`)

export const getCourseAvailableAssessments = (id) =>
  api.get(`${endpoint}/${id}/available`)

export const deleteCourseAssessmentRel = (id) => api.delete(`${endpoint}/${id}`)
