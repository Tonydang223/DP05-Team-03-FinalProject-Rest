import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState: {},
  reducers: {
    setLoggedInUser: (state, action) => {
      console.log(state, 'state');
      console.log('🚀 ~ file: userSlice.jsx:11 ~ action:', action.payload);

      return action.payload;
    },
  },
});

export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
