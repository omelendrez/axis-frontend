import { configureStore } from '@reduxjs/toolkit'

import certificateTypeSlice from './reducers/certificate-type/certificateTypeSlice'
import companySlice from './reducers/company/companySlice'
import contactSlice from './reducers/contact/contactSlice'
import contactTypeSlice from './reducers/contact-type/contactTypeSlice'
import courseSlice from './reducers/course/courseSlice'
import learnerSlice from './reducers/learner/learnerSlice'
import nationalitySlice from './reducers/nationality/nationalitySlice'
import notificationReducer from './reducers/notification/notificationSlice'
import roleSlice from './reducers/role/roleSlice'
import stateSlice from './reducers/state/stateSlice'
import trainingSlice from './reducers/training/trainingSlice'
import userSlice from './reducers/user/userSlice'

export default configureStore({
  reducer: {
    certificateTypes: certificateTypeSlice,
    companies: companySlice,
    contacts: contactSlice,
    contactTypes: contactTypeSlice,
    courses: courseSlice,
    learners: learnerSlice,
    nationalities: nationalitySlice,
    notification: notificationReducer,
    roles: roleSlice,
    states: stateSlice,
    trainings: trainingSlice,
    users: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
