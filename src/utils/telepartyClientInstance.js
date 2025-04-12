import { TelepartyClient } from 'teleparty-websocket-lib';

import { store } from '../app/store';
import { createEventHandler } from './telepartyEventHandlers';

class TelepartyClientInstance {
  /**
   * Creates a new instance of the TelepartyClient class. If the instance has
   * already been created, this function simply returns the existing instance.
   *
   * @returns {TelepartyClient} The TelepartyClient instance.
   */
  constructor() {
    if (!TelepartyClientInstance.instance) {
      TelepartyClientInstance.instance = new TelepartyClient(
        createEventHandler(store.dispatch)
      );
    }
    return TelepartyClientInstance.instance;
  }
}

const telepartyClientInstance = new TelepartyClientInstance();
export default telepartyClientInstance;
