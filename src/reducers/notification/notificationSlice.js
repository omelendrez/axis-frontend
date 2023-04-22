import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    type: null,
    message: null
  }
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      state.data = action.payload
    },
    reset(state) {
      state.data = initialState.data
    }
  }
})

export const { setMessage, reset } = notificationSlice.actions

export default notificationSlice.reducer
