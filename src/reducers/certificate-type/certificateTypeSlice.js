import { createSlice } from '@reduxjs/toolkit'
import {
  createCertificateType,
  updateCertificateType,
  getCertificateTypes,
  deleteCertificateType
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

export const certificateSlice = createSlice({
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

export default certificateSlice.reducer

let lastPagination = null

export function loadCertificateTypes(pagination) {
  const { setLoading, setData, reset } = certificateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      lastPagination = pagination
      const { data } = await getCertificateTypes(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function removeCertificateType(id) {
  const { setLoading, setSuccess, reset } = certificateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteCertificateType(id)
      dispatch(loadCertificateTypes(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function addCertificateType(payload) {
  const { setLoading, setSuccess, reset } = certificateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createCertificateType(payload)
      dispatch(loadCertificateTypes(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}

export function modifyCertificateType(id, payload) {
  const { setLoading, setSuccess, reset } = certificateSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateCertificateType(id, payload)
      dispatch(loadCertificateTypes(lastPagination))
      dispatch(setSuccess())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
