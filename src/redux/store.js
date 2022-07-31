import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slice/layoutSlice';
import loaderReducer from './slice/loaderSlice';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import clientReducer from './slice/clientSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    loader: loaderReducer,
    auth: authReducer,
    user: userReducer,
    client: clientReducer,
  },
});
