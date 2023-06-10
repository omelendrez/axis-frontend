import { api } from './apiClient'

import { setURLParams } from '../../helpers'

export const createClassroom = (payload) => api.post('/class', payload)

export const getClassrooms = (pagination) =>
  api.get(`/class${setURLParams(pagination)}`)

export const getClassroom = (id) => api.get(`/class/${id}`)
export const getClassroomView = (id) => api.get(`/class/${id}/view`)

export const updateClassroom = (id, payload) => api.put(`/class/${id}`, payload)

export const deleteClassroom = (id) => api.delete(`/class/${id}`)
