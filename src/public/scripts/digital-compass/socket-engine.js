'use strict';

import StateEngine from './state-engine';
import io from 'socket.io-client';
let stateEngine = new StateEngine();

export default class SocketEngine {
  constructor(opts) {
    let { host, port } = opts;

    this.gameState = stateEngine;
    this.dc = io.connect(`http://${host}:${port}`);
    this.dc.on('connect', this.onConnect);
    this.dc.on('State Update', this.onStateUpdate);
    this.dc.on('Display Action Complete', this.onDisplayActionComplete);
  }

  displayActionComplete() {
    console.log('CLIENT => emitted display action complete');
    this.dc.emit('Display Action Complete');
  }

  gamepadInput(input) {
    console.log('CLIENT => emitted gamepad input: ', input);
    this.dc.emit('Gamepad Input', input);
  }

  displayJoin() {
    console.log('CLIENT => emitted display join');
    this.dc.emit('Display Join');
  }

  gamepadJoin(name='user', gameCode='1234') {
    console.log('CLIENT => emitted gamepad join: ', name, ' ', gameCode);
    this.dc.emit('Gamepad Join', {
      name: name,
      gameCode: gameCode
    });
  }

  beginGame() {
    console.log('CLIENT => emitted begin game');
    this.dc.emit('Begin Game');
  }

  // onJoinSuccessful() {
  //   console.log('SERVER => emitted join successful');
  // }

  // onGameCode(gameCode) {
  //   console.log('SERVER => emitted game code: ', gameCode);
  // }

  onConnect() {
    console.log('SERVER => emitted connect');
  }

  onDisplayActionComplete() {
    console.log('CLIENT (display) => emitted display action complete')
  }

  onStateUpdate(newState) {
    console.log('SERVER => emitted update state with data: ', newState);
    stateEngine.state = newState;
  }
}
