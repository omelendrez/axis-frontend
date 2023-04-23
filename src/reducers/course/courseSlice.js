import { createSlice } from '@reduxjs/toolkit'
import {
  createCourse,
  updateCourse,
  getCourses,
  deleteCourse
} from '../../services'
import { handleError } from '../error'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const courseSlice = createSlice({
  name: 'courses',
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

export default courseSlice.reducer

export function loadCourses(search) {
  const { setLoading, setData, reset } = courseSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getCourses(search)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
      console.log(error)
    }
  }
}

export function removeCourse(id) {
  const { setLoading, setSuccess, reset } = courseSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCourse(id)
      dispatch(loadCourses())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCourse(payload) {
  const { setLoading, setSuccess, reset } = courseSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCourse(payload)
      dispatch(loadCourses())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCourse(id, payload) {
  const { setLoading, setSuccess, reset } = courseSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCourse(id, payload)
      dispatch(loadCourses())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}