import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClients } from 'services/clientServices';

const initialState = {
  clientList: [],
};

export const getClients = createAsyncThunk('client/all', async (request) => {
  const response = await fetchClients(request);
  return response;
});

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clientList = action.payload.Items;
    });
  },
});

export const selectClient = (state) => state.client;

export default clientSlice.reducer;
