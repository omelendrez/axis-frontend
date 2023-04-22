import { createSlice } from '@reduxjs/toolkit'
import {
  createNationality,
  updateNationality,
  getNationalities,
  deleteNationality
} from '../../services'
import { handleError } from '../error'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const nationalitySlice = createSlice({
  name: 'nationalities',
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

export default nationalitySlice.reducer

export function loadNationalities(search) {
  const { setLoading, setData, reset } = nationalitySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getNationalities(search)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeNationality(id) {
  const { setLoading, setSuccess, reset } = nationalitySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteNationality(id)
      dispatch(loadNationalities())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addNationality(payload) {
  const { setLoading, setSuccess, reset } = nationalitySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createNationality(payload)
      dispatch(loadNationalities())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyNationality(id, payload) {
  const { setLoading, setSuccess, reset } = nationalitySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateNationality(id, payload)
      dispatch(loadNationalities())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
