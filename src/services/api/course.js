import { api } from './apiClient'

export const createCourse = (payload) => api.post('/course', payload)

export const getCourses = (search) =>
  api.get(`/course${search ? `?search=${search}` : ''}`)

export const getCourse = (id) => api.get(`/course/${id}`)

export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)

export const deleteCourse = (id) => api.delete(`/course/${id}`)
