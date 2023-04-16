import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notification/notificationSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer
  },
})
