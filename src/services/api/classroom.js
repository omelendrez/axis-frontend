import { api } from './apiClient'

import { setURLParams } from '@/helpers'

const endpoint = '/classroom'

export const createClassroom = (payload) => api.post(endpoint, payload)

export const getClassrooms = (pagination) =>
  api.get(`${endpoint}${setURLParams(pagination)}`)

export const getClassroom = (id) => api.get(`${endpoint}/${id}`)

export const getClassroomView = (id) => api.get(`${endpoint}/${id}/view`)

export const updateClassroom = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteClassroom = (id) => api.delete(`${endpoint}/${id}`)
