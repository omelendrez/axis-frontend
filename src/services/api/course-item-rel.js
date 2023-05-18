import { api } from './apiClient'

export const createCourseItemRel = (payload) =>
  api.post('/course-item-rel', payload)

export const getCourseItemsRel = (id) => api.get(`/course-item-rel/${id}`)

export const getCourseAvailableItems = (id) =>
  api.get(`/course-item-rel/${id}/available`)

export const deleteCourseItemRel = (id) => api.delete(`/course-item-rel/${id}`)
