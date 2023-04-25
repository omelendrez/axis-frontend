import { createSlice } from '@reduxjs/toolkit'
import {
  createCompany,
  updateCompany,
  getCompanies,
  deleteCompany
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

export const companySlice = createSlice({
  name: 'companies',
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

export default companySlice.reducer

export function loadCompanies(search) {
  const { setLoading, setData, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getCompanies(search)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
      console.log(error)
    }
  }
}

export function removeCompany(id) {
  const { setLoading, setSuccess, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCompany(id)
      dispatch(loadCompanies())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCompany(payload) {
  const { setLoading, setSuccess, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCompany(payload)
      dispatch(loadCompanies())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCompany(id, payload) {
  const { setLoading, setSuccess, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCompany(id, payload)
      dispatch(loadCompanies())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
