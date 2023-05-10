import { createSlice } from '@reduxjs/toolkit'
import {
  createCourseItem,
  updateCourseItem,
  getCourseItems,
  deleteCourseItem
} from '../../services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isFirstLoad: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const courseItemSlice = createSlice({
  name: 'course-items',
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

export default courseItemSlice.reducer

export function loadCourseItems(pagination) {
  const { setLoading, setData, reset } = courseItemSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getCourseItems(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
      console.log(error)
    }
  }
}

export function removeCourseItem(id) {
  const { setLoading, setSuccess, reset } = courseItemSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCourseItem(id)
      dispatch(loadCourseItems())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCourseItem(payload) {
  const { setLoading, setSuccess, reset } = courseItemSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCourseItem(payload)
      dispatch(loadCourseItems())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCourseItem(id, payload) {
  const { setLoading, setSuccess, reset } = courseItemSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCourseItem(id, payload)
      dispatch(loadCourseItems())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
