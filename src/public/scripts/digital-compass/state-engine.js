'use strict';

import { EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const StateEngine = (initialState={}) => {
  let gameState = initialState
  let ee = new EventEmitter()

  /**
   * Setter for the game state. A change event is emitted afterwards.
   *
   * @param {Object} newState The new value to set the state to. Value must be
   *                          serializable to JSON.
   */
  function setState(newState) {
    gameState = newState;
    emitChange()
  }

  /**
   * Getter for the game state.
   *
   * @return {Object} The current game state.
   */
  function getState() {
    return gameState;
  }

  /**
   * Emits a change event.
   */
  function emitChange() {
    ee.emit(CHANGE_EVENT);
  }

  /**
   * Sets a callback as a listener when the state change event is emitted.
   *
   * @param {Function} callback Function to call on state change events
   */
  function addStateListener(callback) {
    ee.on(CHANGE_EVENT, callback);
  }

  /**
   * Removes the callback from the event listener for the state change event.
   *
   * @param  {Function} callback The function to remove
   */
  function removeStateListener(callback) {
    ee.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * The object that acts as the public interface to the state engine.
   */
  return {
    setState,
    getState,
    addStateListener,
    removeStateListener
  }
}

export default StateEngine
