import { configureStore } from '@reduxjs/toolkit';

import userDetailsReducer from '../features/userDetails/userDetailsSlice';
import chatReducer from '../features/chat/chatSlice';
import modalsReducer from '../features/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    chat: chatReducer,
    modals: modalsReducer,
  },
});
