import { api } from './apiClient'

const endpoint = '/course-item-rel'

export const createCourseItemRel = (payload) => api.post(endpoint, payload)

export const getCourseItemsRel = (id) => api.get(`${endpoint}/${id}`)

export const getCourseAvailableItems = (id) =>
  api.get(`${endpoint}/${id}/available`)

export const deleteCourseItemRel = (id) => api.delete(`${endpoint}/${id}`)
