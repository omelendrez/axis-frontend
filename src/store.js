import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notification/notificationSlice'
import userSlice from './reducers/user/userSlice'
import learnerSlice from './reducers/learner/learnerSlice'
import stateSlice from './reducers/state/stateSlice'
import nationalitySlice from './reducers/nationality/nationalitySlice'
import roleSlice from './reducers/role/roleSlice'
import companySlice from './reducers/company/companySlice'
import courseSlice from './reducers/course/courseSlice'
import certificateTypeSlice from './reducers/certificate-type/certificateTypeSlice'
import trainingSlice from './reducers/training/trainingSlice'
import contactTypeSlice from './reducers/contact-type/contactTypeSlice'
import contactSlice from './reducers/contact/contactSlice'

export default configureStore({
  reducer: {
    certificateTypes: certificateTypeSlice,
    companies: companySlice,
    contacts: contactSlice,
    contactTypes: contactTypeSlice,
    courses: courseSlice,
    nationalities: nationalitySlice,
    notification: notificationReducer,
    roles: roleSlice,
    states: stateSlice,
    learners: learnerSlice,
    trainings: trainingSlice,
    users: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
