'use strict';

import { EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

export default class StateEngine extends EventEmitter {
  constructor(opts) {
    super();
    this.gameState = {};
  }

  set state(newState) {
    this.gameState = newState;
    this.emitChange();
  }

  get state() {
    return this.gameState;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addStateListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeStateListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
