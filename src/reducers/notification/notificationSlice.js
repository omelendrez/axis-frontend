import { createSlice } from "@reduxjs/toolkit"

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
    }
  }
})

export const { setMessage } = notificationSlice.actions

export default notificationSlice.reducer
