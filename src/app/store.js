import { configureStore } from '@reduxjs/toolkit';

import userDetailsReducer from '../features/userDetails/userDetailsSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    chat: chatReducer,
  },
});
