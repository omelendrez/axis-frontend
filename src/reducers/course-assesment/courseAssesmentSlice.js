import { createSlice } from '@reduxjs/toolkit'
import {
  createCourseAssesment,
  updateCourseAssesment,
  getCourseAssesments,
  deleteCourseAssesment
} from '@/services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isFirstLoad: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const courseAssesmentSlice = createSlice({
  name: 'course-assesments',
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
      state.isFirstLoad = false
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

export default courseAssesmentSlice.reducer

let lastPagination = null

export function loadCourseAssesments(pagination) {
  const { setLoading, setData, reset } = courseAssesmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getCourseAssesments(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeCourseAssesment(id) {
  const { setLoading, setSuccess, reset } = courseAssesmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCourseAssesment(id)
      dispatch(loadCourseAssesments(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCourseAssesment(payload) {
  const { setLoading, setSuccess, reset } = courseAssesmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCourseAssesment(payload)
      dispatch(loadCourseAssesments(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCourseAssesment(id, payload) {
  const { setLoading, setSuccess, reset } = courseAssesmentSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCourseAssesment(id, payload)
      dispatch(loadCourseAssesments(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
