import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  forgotPwdData: null,
  resetPwdData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.authenticated = action.payload;
    },
    onForgotPassword: (state, action) => {
      state.forgotPwdData = action.payload;
    },
    onResetPassword: (state, action) => {
      state.resetPwdData = action.payload;
    },
  },
});

export const { authenticate, onForgotPassword, onResetPassword } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
