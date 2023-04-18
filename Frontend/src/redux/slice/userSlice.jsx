import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState: {},
  reducer: {
    setLoggedInUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
