import { api } from './apiClient'

export const createCourseAssesmentRel = (payload) =>
  api.post('/course-assesment-rel', payload)

export const getCourseAssesmentsRel = (id) =>
  api.get(`/course-assesment-rel/${id}`)

export const getCourseAvailableAssesments = (id) =>
  api.get(`/course-assesment-rel/${id}/available`)

export const deleteCourseAssesmentRel = (id) =>
  api.delete(`/course-assesment-rel/${id}`)
