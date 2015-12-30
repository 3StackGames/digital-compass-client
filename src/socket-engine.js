'use strict'

import StateEngine from './state-engine'
import io from 'socket.io-client'
import { events, devices } from './constants'
import { validatePayload } from './utils'

const SocketEngine = (opts) => {
  const { host, port } = opts
  const _dc = io.connect(`http://${host}:${port}`)

  // Runs in debug mode which prints out helpful console log statements
  const debug = opts.debug || false
  let stateEngine = StateEngine()

  // Register callbacks on certain socket events
  _dc.on(events.CONNECT, _onConnect)
  _dc.on(events.STATE_UPDATE, _onStateUpdate)
  _dc.on(events.DISPLAY_ACTION_COMPLETE, _onDisplayActionComplete)
  _dc.on(events.DISPLAY_JOIN_REJECTED, _onDisplayJoinRejected)
  _dc.on(events.GAMEPAD_JOIN_REJECTED, _onGamepadJoinRejected)

  /**
   * Emits a display action compete socket event
   */
  function displayActionComplete(payload) {
    // validatePayload(payload, 'gameCode')
    if (debug) console.log('CLIENT => emitted display action complete: ', payload)
    _dc.emit(events.DISPLAY_ACTION_COMPLETE, payload)
  }

  /**
   * Emits a gamepad input socket event with the given payload. The payload
   * must have a `gameCode` field or an error will be thrown.
   *
   * @param  {Object} payload The payload to send over the socket
   */
  function gamepadInput(payload) {
    // validatePayload(payload, 'gameCode')
    if (debug) console.log('CLIENT => emitted gamepad input: ', payload)
    _dc.emit(events.GAMEPAD_INPUT, payload)
  }

  /**
   * Emits a display join socket event.
   */
  function displayJoin(gameCode) {
    if (debug) console.log('CLIENT => emitted display join')
    if (gameCode) {
      _dc.emit(events.DISPLAY_JOIN, { gameCode })
    } else {
      _dc.emit(events.DISPLAY_JOIN)
    }
  }

  /**
   * Emits a gamepad join socket event with the given payload. The payload must
   * have `name` and `gameCode` fields or an error will be thrown.
   *
   * @param  {Object} payload The payload to send over the socket
   */
  function gamepadJoin(payload) {
    // validatePayload(payload, 'name', 'gameCode')
    _dc.emit(events.GAMEPAD_JOIN, payload)
    if (debug) console.log('CLIENT => emitted gamepad join: ', payload)
  }

  /**
   * Emits a begin game socket event.
   */
  function beginGame() {
    if (debug) console.log('CLIENT => emitted begin game')
    _dc.emit(events.BEGIN_GAME)
  }

  /**
   * Handler for the connection socket event.
   */
  function _onConnect() {
    if (debug) console.log('SERVER => emitted connect')
  }

  /**
   * Handler for the display action complete event.
   */
  function _onDisplayActionComplete() {
    if (debug) console.log('CLIENT (display) => emitted display action complete')
  }

  /**
   * Handler for the state update event. Updates the state engine's state with
   * the new state.
   *
   * @param  {Object} newState The updated state object passed from the server
   */
  function _onStateUpdate(newState) {
    if (debug) console.log('SERVER => emitted update state with data: ', newState)
    stateEngine.setState(newState)
  }

  /**
   * Private handler for display join rejection event. Executes a callback if
   * provided.
   *
   * @param  {Function} fn Callback to execute when handler is called
   */
  function _onDisplayJoinRejected() {
    if (debug) console.log('SERVER => emitted display join rejected')
    if (fn) fn()
  }

  /**
   * Public function to set the callback to trigger on display rejected events.
   *
   * @param  {Function} fn Callback to bind display rejected events with
   */
  function onDisplayJoinRejected(fn) {
    _onDisplayJoinRejected.bind(this, fn)
  }

  /**
   * Private handler for gamepad join rejection event. Executes a callback if
   * provided.
   *
   * @param  {Function} fn Callback to execute when handler is called
   */
  function _onGamepadJoinRejected() {
    if (debug) console.log('SERVER => emitted gamepad join rejected')
    if (fn) fn()
  }

  /**
   * Public function to set the callback to trigger on display rejected events.
   *
   * @param  {Function} fn Callback to execute when handler is called
   */
  function onGamepadJoinRejected(fn) {
    _onGamepadJoinRejected.bind(this, fn)
  }

  /**
   * The object that acts as the public interface for the socket engine.
   */
  return Object.assign(stateEngine, {
    displayActionComplete,
    gamepadInput,
    displayJoin,
    gamepadJoin,
    beginGame,
    onDisplayJoinRejected,
    onGamepadJoinRejected,
    socket: _dc
  })
}

export default SocketEngine
