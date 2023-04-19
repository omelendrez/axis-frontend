import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notification/notificationSlice";
import userSlice from "./reducers/user/userSlice";
import traineeSlice from "./reducers/trainee/traineeSlice";
import stateSlice from "./reducers/state/stateSlice";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    users: userSlice,
    trainees: traineeSlice,
    states: stateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
