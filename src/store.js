import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notification/notificationSlice'
import userSlice from './reducers/user/userSlice'
import traineeSlice from './reducers/trainee/traineeSlice'
import stateSlice from './reducers/state/stateSlice'
import nationalitySlice from './reducers/nationality/nationalitySlice'
import roleSlice from './reducers/role/roleSlice'
import companySlice from './reducers/company/companySlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    users: userSlice,
    trainees: traineeSlice,
    states: stateSlice,
    nationalities: nationalitySlice,
    roles: roleSlice,
    companies: companySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
