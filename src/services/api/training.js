import { setURLParams } from '@/helpers'
import { api } from './apiClient'

const endpoint = '/training'

export const createTraining = (payload) => api.post(endpoint, payload)

export const getLearnerTrainings = (id) => api.get(`${endpoint}/${id}/all`)

export const getTrainings = ({ date, statuses, pagination }) =>
  api.get(
    [
      endpoint,
      date || 'no-date',
      statuses || 'no-statuses',
      setURLParams(pagination)
    ].join('/')
  )

/**
 *
 * @returns 'min' and 'max' year of training records
 */
export const getActivePeriod = () => api.get(`${endpoint}/active-period`)

/**
 *
 * @param {numeric} year
 * @returns List of course by month for a given year
 */
export const getCourseMonthByYear = (year) =>
  api.get(`${endpoint}/course-month-by-year/${year}`)

/**
 *
 * @param {numeric} year
 * @returns List of learners assisted to courses by month for a given year
 */
export const getLearnersByMonth = (year) =>
  api.get(`${endpoint}/month-by-year/${year}`)

// /**
//  *
//  * @param {numeric} year
//  * @returns List of all courses in a year calendar
//  */
// export const getCourseByYear = (year) =>
//   api.get(`${endpoint}/course-by-year/${year}`)

/**
 *
 * @param {numeric} year
 * @returns List of records for course treemap
 */
export const getCourseTypeByYear = (year) =>
  api.get(`${endpoint}/course-type-by-year/${year}`)

/**
 *
 * @param {object} params
 * @returns List of all records filtered by company, period and course
 */
export const getTrainingRecords = (params) =>
  api.get(`${endpoint}/training-records${setURLParams(params)}`)

/**
 *
 * @param {numeric} id
 * @returns Object with all existing info about a training record and related tables for viewing
 */
export const getTrainingView = (id) => api.get(`${endpoint}/${id}/view`)

/**
 *
 * @param {number} id
 * @returns Object with all fields in table training for a give record for editing
 */
export const getTraining = (id) => api.get(`${endpoint}/${id}`)

export const getTrainingByDate = (date, statuses) =>
  api.get(`${endpoint}/${date}/${statuses}`)

export const updateTraining = (id, payload) =>
  api.put(`${endpoint}/${id}`, payload)

export const verifyTrainingRecord = (id) => api.get(`${endpoint}/${id}/verify`)

export const deleteTraining = (id) => api.delete(`${endpoint}/${id}`)
