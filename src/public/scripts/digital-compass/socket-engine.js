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
    this.dc.on('update state', this.onUpdateState);
  }

  joinPlayer(player) {
    console.log('CLIENT => emitted join player with data: ', player);
    this.dc.emit('join player', {
      player: player
    })
  }

  submitAnswers(answers) {
    console.log('CLIENT => emitted answers with data: ', answers);
    this.dc.emit('submit answers', {
      answers: answers
    });
  }

  onConnect() {
    console.log('SERVER => emitted connect');
  }

  onUpdateState(newState) {
    console.log('SERVER => emitted update state with data: ', newState);
    stateEngine.state = newState;
  }
}