import { TelepartyClient } from 'teleparty-websocket-lib';

import { store } from '../app/store';
import { createEventHandler } from './telepartyEventHandlers';

class TelepartyClientInstance {
  constructor() {
    if (!TelepartyClientInstance.instance) {
      this.reconnectDelay = 3000; // 3 seconds
      this.maxReconnectAttempts = 10; // Maximum number of reconnection attempts
      this.reconnectAttempts = 0;

      this.isManualDisconnect = false;

      TelepartyClientInstance.instance = this._initializeClient();
    }
    return TelepartyClientInstance.instance;
  }

  _initializeClient() {
    const client = new TelepartyClient(
      createEventHandler(store.dispatch, this)
    );
    client.handleManualDisconnect = this.handleManualDisconnect.bind(this);
    client.reinitializeClient = this.reinitializeClient.bind(this);
    return client;
  }

  _handleSocketClose() {
    if (this.isManualDisconnect) return;
    console.log('Socket has been closed. Attempting to reconnect...');
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.reconnectTimeoutId = setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}`);
        TelepartyClientInstance.instance = this._initializeClient();
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached. Unable to reconnect.');
    }
  }

  _handleSocketOpen() {
    console.log('Connection successfully re-established.');
    this.reconnectAttempts = 0; // Reset reconnection attempts
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId); // Clear any pending reconnection attempts
      this.reconnectTimeoutId = null;
    }
  }

  handleManualDisconnect() {
    console.log('Disconnecting...');
    TelepartyClientInstance.instance.teardown();
    this.isManualDisconnect = true;
  }

  reinitializeClient() {
    console.log('Reinitializing TelepartyClient...');
    this.isManualDisconnect = false; // Reset manual disconnect flag
    this.client = this._initializeClient(); // Create a new TelepartyClient instance
  }
}

const telepartyClientInstance = new TelepartyClientInstance();
export default telepartyClientInstance;
