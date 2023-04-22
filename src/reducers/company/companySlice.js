import { createSlice } from '@reduxjs/toolkit'
import {
  createCompany,
  updateCompany,
  getCompanies,
  deleteCompany
} from '../../services'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const companySlice = createSlice({
  name: 'companies',
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
    setSuccess(state, action) {
      state.data = action.payload
      state.isSuccess = true
      state.isLoading = false
      state.isError = false
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
  const { setLoading, setSuccess, setError, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getCompanies(search)
      dispatch(setSuccess(data))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data))
    }
  }
}

export function removeCompany(id) {
  const { setLoading, setError } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCompany(id)
      dispatch(loadCompanies())
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}

export function addCompany(payload) {
  const { setLoading, setError } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCompany(payload)
      dispatch(loadCompanies())
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}

export function modifyCompany(id, payload) {
  const { setLoading, setError } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCompany(id, payload)
      dispatch(loadCompanies())
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}
