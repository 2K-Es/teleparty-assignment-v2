import { TelepartyClient } from 'teleparty-websocket-lib';

import { store } from '../app/store';
import { createEventHandler } from './telepartyEventHandlers';

class TelepartyClientInstance {
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
