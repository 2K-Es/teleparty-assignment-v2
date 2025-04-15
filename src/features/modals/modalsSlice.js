import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isChatRoomInvalidSessionModalOpen: false,
  },
  reducers: {
    setIsChatRoomInvalidSessionModalOpen: (state, action) => {
      state.isChatRoomInvalidSessionModalOpen = action.payload;
    },
  },
});

export const { setIsChatRoomInvalidSessionModalOpen } = modalsSlice.actions;
export default modalsSlice.reducer;
