import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/course-module'

export const createCourseModule = (payload) => api.post(endpoint, payload)

export const getCourseModules = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getCourseModule = (id) => api.get(`${endpoint}/${id}`)

export const updateCourseModule = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteCourseModule = (id) => api.delete(`${endpoint}/${id}`)
