'use strict'

import StateEngine from './state-engine'
import io from 'socket.io-client'
import { events, devices } from './constants'
import { validatePayload } from './utils'

const SocketEngine = (opts) =>  {
  const { host, port } = opts
  const _dc = io.connect(`http://${host}:${port}`)

  // Runs in debug mode which prints out helpful console log statements
  const debug = opts.debug || false
  let stateEngine = StateEngine()

  // Register callbacks on certain socket events
  _dc.on(events.CONNECT, onConnect)
  _dc.on(events.STATE_UPDATE, onStateUpdate)
  _dc.on(events.DISPLAY_ACTION_COMPLETE, onDisplayActionComplete)

  /**
   * Emits a display action compete socket event
   */
  function displayActionComplete() {
    if (debug) console.log('CLIENT => emitted display action complete')
    _dc.emit(events.DISPLAY_ACTION_COMPLETE)
  }

  /**
   * Emits a gamepad input socket event with the given payload. The payload
   * must have a `gameCode` field or an error will be thrown.
   *
   * @param  {Object} payload The payload to send over the socket
   */
  function gamepadInput(payload) {
    validatePayload(payload, 'gameCode')
    if (debug) console.log('CLIENT => emitted gamepad input: ', payload)
    _dc.emit(events.GAMEPAD_INPUT, payload)
  }

  /**
   * Emits a display join socket event.
   */
  function displayJoin() {
    if (debug) console.log('CLIENT => emitted display join')
    _dc.emit(events.DISPLAY_JOIN)
  }

  /**
   * Emits a gamepad join socket event with the given payload. The payload must
   * have `name` and `gameCode` fields or an error will be thrown.
   *
   * @param  {Object} payload The payload to send over the socket
   */
  function gamepadJoin(payload) {
    validatePayload(payload, 'name', 'gameCode')
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
  function onConnect() {
    if (debug) console.log('SERVER => emitted connect')
  }

  /**
   * Handler for the display action complete event.
   */
  function onDisplayActionComplete() {
    if (debug) console.log('CLIENT (display) => emitted display action complete')
  }

  /**
   * Handler for the state update event. Updates the state engine's state with
   * the new state.
   *
   * @param  {Object} newState The updated state object passed from the server.
   */
  function onStateUpdate(newState) {
    if (debug) console.log('SERVER => emitted update state with data: ', newState)
    stateEngine.setState(newState)
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
    socket: _dc
  })
}

export default SocketEngine
