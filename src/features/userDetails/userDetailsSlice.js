import { createSlice } from '@reduxjs/toolkit';

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userName: sessionStorage.getItem('userName') || '',
    userProfilePic: sessionStorage.getItem('userProfilePic') || '',
  },
  reducers: {
    setUserName: (state, action) => {
      sessionStorage.setItem('userName', action.payload);
      console.log('user name set: ', action.payload);
      state.userName = action.payload;
    },
    setUserProfilePic: (state, action) => {
      sessionStorage.setItem('userProfilePic', action.payload);
      state.userProfilePic = action.payload;
    },
  },
});

export const { setUserName, setUserProfilePic } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
