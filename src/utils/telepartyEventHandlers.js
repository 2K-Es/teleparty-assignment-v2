import { SocketMessageTypes } from 'teleparty-websocket-lib';

import { addMessage, setConnectionState } from '../features/chat/chatSlice';

/**
 * Creates an event handler for handling WebSocket events.
 *
 * @param {Function} dispatch - The Redux dispatch function for dispatching actions.
 * @returns {Object} An object containing event handling functions.
 *
 * @property {Function} onConnectionReady - Handles the event when the connection is established.
 * @property {Function} onClose - Handles the event when the socket connection is closed.
 * @property {Function} onMessage - Handles incoming messages and dispatches actions based on message type.
 *   - Dispatches 'chat/setIsAnyoneTyping' for typing presence updates.
 *   - Dispatches 'addMessage' for received chat messages.
 */

export const createEventHandler = (dispatch, clientInstance) => ({
  onConnectionReady: () => {
    console.log('Connection has been established');
    dispatch(setConnectionState(true));
    clientInstance._handleSocketOpen();
  },
  onClose: () => {
    console.log('Socket has been closed');
    dispatch(setConnectionState(false));
    clientInstance._handleSocketClose(); // Trigger reconnection logic
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
