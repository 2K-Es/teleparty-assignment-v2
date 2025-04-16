import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isChatRoomInvalidSessionModalOpen: false,
    isSignOutConfirmationModalOpen: false,
  },
  reducers: {
    setIsChatRoomInvalidSessionModalOpen: (state, action) => {
      state.isChatRoomInvalidSessionModalOpen = action.payload;
    },
    setIsSignOutConfirmationModalOpen: (state, action) => {
      state.isSignOutConfirmationModalOpen = action.payload;
    },
  },
});

export const {
  setIsChatRoomInvalidSessionModalOpen,
  setIsSignOutConfirmationModalOpen,
} = modalsSlice.actions;
export default modalsSlice.reducer;
