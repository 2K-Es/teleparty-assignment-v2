import _map from 'lodash/map';
import _size from 'lodash/size';

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
    clearMessages: (state) => {
      state.messageObjects = [];
    },
    initMessageBulk: (state, action) => {
      if (_size(action.payload?.messages) === 0) return;
      const messageObjects = _map(
        action.payload.messages,
        (message) => message
      );
      state.messageObjects = messageObjects;
    },
    setIsAnyoneTyping: (state, action) => {
      state.isAnyoneTyping = action.payload;
    },
    setConnectionState: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  addMessage,
  clearMessages,
  initMessageBulk,
  setIsAnyoneTyping,
  setConnectionState,
} = chatSlice.actions;
export default chatSlice.reducer;
