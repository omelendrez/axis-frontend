import { createSlice } from '@reduxjs/toolkit'
import {
  createContactType,
  updateContactType,
  getContactTypes,
  deleteContactType
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

export const contactSlice = createSlice({
  name: 'contactTypes',
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

export default contactSlice.reducer

export function loadContactTypes(pagination) {
  const { setLoading, setData, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getContactTypes(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeContactType(id) {
  const { setLoading, setSuccess, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteContactType(id)
      dispatch(loadContactTypes())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addContactType(payload) {
  const { setLoading, setSuccess, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createContactType(payload)
      dispatch(loadContactTypes())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyContactType(id, payload) {
  const { setLoading, setSuccess, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateContactType(id, payload)
      dispatch(loadContactTypes())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
