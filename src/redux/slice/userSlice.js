import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData, getUserMenuAccess } from 'services/userServices';

const initialState = {
  userData: null,
  userMenuAccess: null,
};

export const getUser = createAsyncThunk('user/userbyemailid', async (request) => {
  const response = await getUserData(request);
  return response;
});

export const getUserMenu = createAsyncThunk('user/menuaccess', async (request) => {
  const response = await getUserMenuAccess(request);
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(getUserMenu.fulfilled, (state, action) => {
      state.userMenuAccess = action.payload.Items[0];
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
