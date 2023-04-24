// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//   name: 'loggedInUser',
//   initialState: {},
//   reducers: {
//     setLoggedInUser: (state, action) => {
//       console.log(state, 'state');
//       console.log('🚀 ~ file: userSlice.jsx:11 ~ action:', action.payload);

//       return action.payload;
//     },
//   },
// });

// export const { setLoggedInUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const checkAuth = () => Boolean(localStorage.getItem('access_token'));

const initialState = {
  isAuth: checkAuth(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    setAuth(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.clear();
    },
  },
});

const { reducer, actions } = authSlice;

export const { setAuth, logout, login } = actions;

export default reducer;
