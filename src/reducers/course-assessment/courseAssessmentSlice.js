import { createSlice } from '@reduxjs/toolkit'
import {
  createCourseAssessment,
  updateCourseAssessment,
  getCourseAssessments,
  deleteCourseAssessment
} from '@/services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const courseAssessmentSlice = createSlice({
  name: 'course-assessments',
  initialState: initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
    setSuccess(state) {
      state.isSuccess = true
      state.isLoading = false
      state.isError = false
    },
    setData(state, action) {
      state.data = action.payload
    },
    setError(state, action) {
      state.isSuccess = false
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    reset(state) {
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
    }
  }
})

export default courseAssessmentSlice.reducer

let lastPagination = null

export function loadCourseAssessments(pagination) {
  const { setLoading, setData, reset } = courseAssessmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getCourseAssessments(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeCourseAssessment(id) {
  const { setLoading, setSuccess, reset } = courseAssessmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCourseAssessment(id)
      dispatch(loadCourseAssessments(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCourseAssessment(payload) {
  const { setLoading, setSuccess, reset } = courseAssessmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCourseAssessment(payload)
      dispatch(loadCourseAssessments(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCourseAssessment(id, payload) {
  const { setLoading, setSuccess, reset } = courseAssessmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCourseAssessment(id, payload)
      dispatch(loadCourseAssessments(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
