import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
