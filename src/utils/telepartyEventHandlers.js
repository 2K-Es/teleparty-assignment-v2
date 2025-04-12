import { SocketMessageTypes } from 'teleparty-websocket-lib';

import { addMessage, setConnectionState } from '../features/chat/chatSlice';

export const createEventHandler = (dispatch) => ({
  onConnectionReady: () => {
    console.log('Connection has been established');
    dispatch(setConnectionState(true));
  },
  onClose: () => {
    console.log('Socket has been closed');
    dispatch(setConnectionState(false));
  },
  onMessage: (message) => {
    const type = message.type;
    const messageObject = message.data;
    switch (type) {
      case SocketMessageTypes.SET_TYPING_PRESENCE: {
        dispatch({
          type: 'chat/setIsAnyoneTyping',
          payload: messageObject.anyoneTyping,
        });
        break;
      }
      case SocketMessageTypes.SEND_MESSAGE: {
        dispatch(addMessage(messageObject));
        break;
      }
    }
  },
});
