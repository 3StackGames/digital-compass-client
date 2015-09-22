'use strict';

import React from 'react';
import engine from '../engine';
// import Landing from './landing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: this.engineState
    }
    this.engineState = engine.gameState.state;
  }

  componentWillMount() {
    engine.gameState.addStateListener(this.bindState.bind(this));
    this.setState({
      gameState: this.engineState
    });
    engine.dc.on('Game Code', (gameCode) => {
      this.setState({
        gameCode: gameCode
      });
    });
  }

  componentWillUnmount() {
    engine.gameState.removeStateListener(this.bindState.bind(this));
  }

  render() {
    return (
      <div>
        <button
          onClick={() => { engine.displayJoin() }}>
          Display Join
        </button>
        <button
          onClick={() => { engine.gamepadJoin('arjun', this.state.gameCode) }}>
          Gamepad Join
        </button>
        <input onChange={this.inputGameCode.bind(this)}/>
        <button
          onClick={() => { engine.beginGame() }}>
          Begin Game
        </button>
        <button
          onClick={() => { engine.displayActionComplete() }}>
          Display Action Complete
        </button>
        <button
          onClick={() => { engine.gamepadInput() }}>
          Gamepad Input
        </button>
      </div>
    );
  }

  inputGameCode(e) {
    this.setState({
      gameCode: e.target.value
    })
  }

  bindState() {
    this.setState({
      gameState: this.engineState
    });
  }

  joinPlayer() {
    let arjun = {
      name: 'Arjun Sarode',
      id: '1234'
    };
    engine.joinPlayer(arjun);
  }

  submitAnswers() {
    let answers = [{ value: 'hi' }, { value: 'bye' }];
    engine.submitAnswers(answers);
  }

  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}