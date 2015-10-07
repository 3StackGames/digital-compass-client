'use strict';

import React from 'react';
import engine from '../engine';
// import Landing from './landing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: engine.gameState.state
    }
  }

  componentWillMount() {
    engine.gameState.addStateListener(this.bindState.bind(this));
    this.setState({
      gameState: engine.gameState.state
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
        <div className="block block-events">
          <p>Events:</p>
          <button
            onClick={() => { engine.displayJoin() }}>
            Display Join
          </button>
          <button
            onClick={() => { engine.gamepadJoin('arjun', this.state.gameCode) }}>
            Gamepad Join
          </button>
          <button
            onClick={() => { engine.beginGame() }}>
            Begin Game
          </button>
          <button
            onClick={() => { engine.displayActionComplete() }}>
            Display Action Complete
          </button>
        </div>
        <div className="block block-player-join">
          <p>Gamepad join:</p>
          <div>
            <label>Name</label>
            <input onChange={this.inputName.bind(this)}/>
          </div>
          <div>
            <label>Code</label>
            <input onChange={this.inputGameCode.bind(this)}/>
          </div>
          <button onClick={this.gamepadJoin.bind(this)}>Join</button>
        </div>
        <div className="block block-input">
          <p>Gamepad input:</p>
          <input onChange={this.bindLie.bind(this)}/>
          <button
            onClick={this.inputLie.bind(this)}>
            Gamepad Input
          </button>
          {this.playerSelectionInputs}
        </div>
        <div className="block block-state">
          <p>Game State:</p>
          <div>{JSON.stringify(this.state.gameState, null, 2)}</div>
        </div>
      </div>
    );
  }

  get playerSelectionInputs() {

    // {
    //   question: currentquestion,
    //   lies: [
    //     {
    //       lie: 'text',
    //       liar: displayName
    //     }
    //   ],
    //   voteCount:,
    //   questionCount:
    //
    // }
    if (!engine.gameState.state.lies || engine.gameState.state.lies.length === 0) {
      return (
        <p>No lies</p>
      );
    }
    return engine.gameState.state.lies.map(lieItem => {
      let { lie } = lieItem;
      return (
        <button
          key={lie}>{lie}
          onClick={() => { engine.gamepadInput(lie) }}>
        </button>
      );
    });
  }

  bindLie(e) {
    let lie = e.target.value;
    this.setState({
      lie: lie
    });
  }

  inputLie(e) {
    let { lie, gameCode } = this.state;
    let player = this.state.gamepadName;

    engine.gamepadInput({
      lie,
      player,
      gameCode
    });
  }

  inputName(e) {
    this.setState({
      gamepadName: e.target.value
    });
  }

  inputGameCode(e) {
    this.setState({
      gameCode: e.target.value
    })
  }

  gamepadJoin(e) {
    engine.gamepadJoin(this.state.gamepadName, this.state.gameCode);
  }

  bindState() {
    this.setState({
      gameState: engine.gameState.state
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
