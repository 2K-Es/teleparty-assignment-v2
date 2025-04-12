import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messageObjects: [],
    isAnyoneTyping: false,
    isConnected: false,
  },
  reducers: {
    addMessage: (state, action) => {
      console.log('Adding message object:', action.payload);
      state.messageObjects.push(action.payload);
    },
    setIsAnyoneTyping: (state, action) => {
      state.isAnyoneTyping = action.payload;
    },
    setConnectionState: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { addMessage, setIsAnyoneTyping, setConnectionState } =
  chatSlice.actions;
export default chatSlice.reducer;
