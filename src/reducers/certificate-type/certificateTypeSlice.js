import { createSlice } from '@reduxjs/toolkit'
import {
  createCertificateType,
  updateCertificateType,
  getCertificateTypes,
  deleteCertificateType
} from '../../services'
import { handleError } from '../error'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const companySlice = createSlice({
  name: 'certificateTypes',
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

export default companySlice.reducer

export function loadCertificateTypes(search) {
  const { setLoading, setData, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getCertificateTypes(search)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
      console.log(error)
    }
  }
}

export function removeCertificateType(id) {
  const { setLoading, setSuccess, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCertificateType(id)
      dispatch(loadCertificateTypes())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCertificateType(payload) {
  const { setLoading, setSuccess, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCertificateType(payload)
      dispatch(loadCertificateTypes())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCertificateType(id, payload) {
  const { setLoading, setSuccess, reset } = companySlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCertificateType(id, payload)
      dispatch(loadCertificateTypes())
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
