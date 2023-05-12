import { createSlice } from '@reduxjs/toolkit'
import {
  createContact,
  updateContact,
  getContacts,
  deleteContact
} from '../../services'
import { handleError } from '../error'

let learner = null

const initialState = {
  data: { rows: [], count: 0 },
  isFirstLoad: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const contactSlice = createSlice({
  name: 'contacts',
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

export function loadContacts(id) {
  const { setLoading, setData, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      learner = id
      const { data } = await getContacts(id)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeContact(id) {
  const { setLoading, setSuccess, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteContact(id)
      dispatch(loadContacts(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addContact(payload) {
  const { setLoading, setSuccess, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createContact(payload)
      dispatch(loadContacts(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyContact(id, payload) {
  const { setLoading, setSuccess, reset } = contactSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateContact(id, payload)
      dispatch(loadContacts(learner))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
