import { api } from './apiClient'

const endpoint = '/course-module-rel'

export const createCourseModuleRel = (payload) => api.post(endpoint, payload)

export const getCourseModulesRel = (id) => api.get(`${endpoint}/${id}`)

export const getCourseAvailableModules = (id) =>
  api.get(`${endpoint}/${id}/available`)

export const deleteCourseModuleRel = (id) => api.delete(`${endpoint}/${id}`)
