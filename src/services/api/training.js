import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/training'

export const createTraining = (payload) => api.post(endpoint, payload)

export const getLearnerTrainings = (id) => api.get(`${endpoint}/${id}/all`)

export const getTrainings = ({ date, statuses, pagination }) => {
  let path = []

  path.push(endpoint)
  path.push(date || 'no-date')

  if (statuses) {
    path.push(statuses)
  }

  path.push(setURLParams(pagination))

  return api.get(path.join('/'))
}

export const getTrainingView = (id) => api.get(`${endpoint}/${id}/view`)

export const getTraining = (id) => api.get(`${endpoint}/${id}`)

export const getTrainingByDate = (date, statuses) =>
  api.get(`${endpoint}/${date}/${statuses}`)

export const updateTraining = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const deleteTraining = (id) => api.delete(`${endpoint}/${id}`)
