import { TelepartyClient } from 'teleparty-websocket-lib';

import { store } from '../app/store';
import { createEventHandler } from './telepartyEventHandlers';

class TelepartyClientInstance {
  constructor() {
    this.client = null;
    this.isManualDisconnect = false;
  }

  /**
   * Initializes or reconnects the TelepartyClient instance.
   * @returns {void}
   */
  connect() {
    if (this.client) {
      console.log('Client already connected or reconnecting...');
      return;
    }

    console.log('Initializing TelepartyClient...');
    this.isManualDisconnect = false;
    this.client = new TelepartyClient(createEventHandler(store.dispatch, this));
  }

  /**
   * Disconnects the TelepartyClient instance manually.
   * @returns {void}
   */
  disconnect() {
    if (!this.client) {
      console.log('No active client to disconnect.');
      return;
    }

    console.log('Disconnecting TelepartyClient...');
    this.client.teardown();
    this.client = null;
    this.isManualDisconnect = true;
  }

  /**
   * Handles the socket close event and attempts to reconnect if not manually disconnected.
   * @returns {void}
   */
  handleSocketClose() {
    if (this.isManualDisconnect) {
      console.log('Socket closed manually. No reconnection attempt.');
      return;
    }

    console.log('Socket closed unexpectedly. Attempting to reconnect...');
    this.client = null;
    setTimeout(() => {
      this.connect();
    }, 3000);
  }

  /**
   * Handles the socket open event.
   * @returns {void}
   */
  handleSocketOpen() {
    console.log('Socket connection established.');
  }

  /**
   * Sends a message using the TelepartyClient instance.
   * @param {SocketMessageTypes} type - The type of message to send.
   * @param {any} data - The data to send with the message.
   * @param {Function} [callback] - Optional callback function for the server response.
   */
  sendMessage(type, data, callback) {
    if (!this.client) {
      console.error('Client is not connected. Cannot send message.');
      return;
    }
    this.client.sendMessage(type, data, callback);
  }

  /**
   * Joins a chat room using the TelepartyClient instance.
   * @param {string} nickname - The user's nickname.
   * @param {string} roomId - The room ID to join.
   * @param {string} [userIcon] - Optional user icon.
   * @returns {Promise<MessageList>} - A promise resolving to the list of previous messages.
   */
  async joinChatRoom(nickname, roomId, userIcon) {
    if (!this.client) {
      console.error('Client is not connected. Cannot join chat room.');
      return Promise.reject('Client is not connected.');
    }
    return this.client.joinChatRoom(nickname, roomId, userIcon);
  }

  /**
   * Creates a chat room using the TelepartyClient instance.
   * @param {string} nickname - The user's nickname.
   * @param {string} [userIcon] - Optional user icon.
   * @returns {Promise<string>} - A promise resolving to the created room ID.
   */
  async createChatRoom(nickname, userIcon) {
    if (!this.client) {
      console.error('Client is not connected. Cannot create chat room.');
      return Promise.reject('Client is not connected.');
    }
    return this.client.createChatRoom(nickname, userIcon);
  }
}

const telepartyClientInstance = new TelepartyClientInstance();
export default telepartyClientInstance;
