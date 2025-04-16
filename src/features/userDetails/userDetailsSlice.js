import { createSlice } from '@reduxjs/toolkit';

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userName: sessionStorage.getItem('userName') || '',
  },
  reducers: {
    setUserName: (state, action) => {
      sessionStorage.setItem('userName', action.payload);
      console.log('user name set: ', action.payload);
      state.userName = action.payload;
    },
  },
});

export const { setUserName } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
