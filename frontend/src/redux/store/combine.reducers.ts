import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import threadReducer from "./slices/threadSlice";
import jobReducer from "./slices/jobSlice";
import courseReducer from "./slices/courseSlice";
import notificationReducer from "./slices/notificationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  threads: threadReducer,
  jobs: jobReducer,
  courses: courseReducer,
  notifications: notificationReducer,
});

export default rootReducer;
