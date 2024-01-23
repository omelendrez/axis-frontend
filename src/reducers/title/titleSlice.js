import { createSlice } from '@reduxjs/toolkit'
import { getTitles } from '@/services'
import { handleError } from '../error'

const initialState = {
  data: { rows: [], count: 0 },
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}

export const titleSlice = createSlice({
  name: 'titles',
  initialState: initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
    setData(state, action) {
      state.data = action.payload
    },
    setSuccess(state) {
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

export default titleSlice.reducer

export function loadTitles(pagination) {
  const { setLoading, setData, reset } = titleSlice.actions

  return async (dispatch) => {
    dispatch(setLoading())
    try {
      const { data } = await getTitles(pagination)
      dispatch(setData(data))
      dispatch(reset())
    } catch (error) {
      handleError(error, dispatch, reset)
    }
  }
}
