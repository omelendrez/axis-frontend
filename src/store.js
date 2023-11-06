import { configureStore } from '@reduxjs/toolkit'

import certificateTypeSlice from './reducers/certificate-type/certificateTypeSlice'
import classSlice from './reducers/class/classSlice'
import companySlice from './reducers/company/companySlice'
import contactSlice from './reducers/contact/contactSlice'
import contactTypeSlice from './reducers/contact-type/contactTypeSlice'
import courseItemSlice from './reducers/course-item/courseItemSlice'
import courseModuleSlice from './reducers/course-module/courseModuleSlice'
import courseSlice from './reducers/course/courseSlice'
import learnerSlice from './reducers/learner/learnerSlice'
import nationalitySlice from './reducers/nationality/nationalitySlice'
import notificationReducer from './reducers/notification/notificationSlice'
import roleSlice from './reducers/role/roleSlice'
import stateSlice from './reducers/state/stateSlice'
import statusSlice from './reducers/status/statusSlice'
import trainingSlice from './reducers/training/trainingSlice'
import userSlice from './reducers/user/userSlice'

export default configureStore({
  reducer: {
    certificateTypes: certificateTypeSlice,
    classes: classSlice,
    companies: companySlice,
    contacts: contactSlice,
    contactTypes: contactTypeSlice,
    courseItems: courseItemSlice,
    courseModules: courseModuleSlice,
    courses: courseSlice,
    learners: learnerSlice,
    nationalities: nationalitySlice,
    notification: notificationReducer,
    roles: roleSlice,
    states: stateSlice,
    statuses: statusSlice,
    trainings: trainingSlice,
    users: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})
