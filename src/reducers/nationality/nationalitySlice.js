import { createSlice } from '@reduxjs/toolkit'
import {
  createNationality,
  updateNationality,
  getNationalities,
  deleteNationality
} from '../../services'

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const userSlice = createSlice({
  name: 'nationalities',
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

export default userSlice.reducer

export function loadNationalities(search) {
  const { setLoading, setSuccess, setError, reset } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getNationalities(search)
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

export function removeNationality(id) {
  const { setLoading, setError } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await deleteNationality(id)
      dispatch(loadNationalities())
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}

export function addNationality(payload) {
  const { setLoading, setError } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await createNationality(payload)
      dispatch(loadNationalities())
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}

export function modifyNationality(id, payload) {
  const { setLoading, setError } = userSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      await updateNationality(id, payload)
      dispatch(loadNationalities())
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}
