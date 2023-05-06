import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notification/notificationSlice'
import userSlice from './reducers/user/userSlice'
import traineeSlice from './reducers/trainee/traineeSlice'
import stateSlice from './reducers/state/stateSlice'
import nationalitySlice from './reducers/nationality/nationalitySlice'
import roleSlice from './reducers/role/roleSlice'
import companySlice from './reducers/company/companySlice'
import courseSlice from './reducers/course/courseSlice'
import certificateTypeSlice from './reducers/certificate-type/certificateTypeSlice'
import trainingSlice from './reducers/training/trainingSlice'

export default configureStore({
  reducer: {
    certificateTypes: certificateTypeSlice,
    companies: companySlice,
    courses: courseSlice,
    nationalities: nationalitySlice,
    notification: notificationReducer,
    roles: roleSlice,
    states: stateSlice,
    trainees: traineeSlice,
    trainings: trainingSlice,
    users: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
