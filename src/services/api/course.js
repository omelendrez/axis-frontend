import { api } from './apiClient'

export const createCourse = (payload) => api.post('/course', payload)

export const getCourses = ({ search, limit, offset }) =>
  api.get(`/course?search=${search}&limit=${limit}&offset=${offset}`)

export const getCourse = (id) => api.get(`/course/${id}`)

export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)

export const deleteCourse = (id) => api.delete(`/course/${id}`)
