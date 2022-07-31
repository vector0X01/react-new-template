import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    drawerToggle: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export const { drawerToggle } = layoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLayout = (state) => state.layout;

export default layoutSlice.reducer;
