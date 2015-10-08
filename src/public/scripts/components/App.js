'use strict';

import React from 'react'
import engine from '../engine'
import autobind from 'autobind-decorator'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: engine.getState()
    }
  }

  componentWillMount() {
    engine.gameState.addStateListener(this.bindState);
    this.setState({
      gameState: engine.getState()
    });
  }

  componentWillUnmount() {
    engine.gameState.removeStateListener(this.bindState);
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
            <input onChange={this.inputName}/>
          </div>
          <div>
            <label>Code</label>
            <input onChange={this.inputGameCode}/>
          </div>
          <button onClick={this.gamepadJoin}>Join</button>
        </div>
        <div className="block block-input">
          <p>Gamepad input:</p>
          <input onChange={this.bindLie}/>
          <button
            onClick={this.inputLie}>
            Submit Lie
          </button>
          <div>
            {this.playerSelectionInputs}
          </div>
          <div>
            {this.moveOnButton}
          </div>
          <div>
            {this.restartButton}
          </div>
        </div>
        <div className="block block-state">
          <p>Game State:</p>
          <pre>{JSON.stringify(this.state.gameState, null, 2)}</pre>
        </div>
      </div>
    );
  }

  get restartButton() {
    return <button onClick={this.restart}>Restart</button>
  }

  get moveOnButton() {
    return (
      <button onClick={this.moveOn}>Move On</button>
    )
  }

  @autobind
  moveOn() {
    let { gameCode } = this.state
    engine.gamepadInput({
      gameCode,
      moveOn: true
    })
  }

  @autobind
  restart() {
    let { gameCode } = this.state
    engine.gamepadInput({
      gameCode,
      restart: true
    })
  }

  get playerSelectionInputs() {
    if (!engine.getState().lies || engine.getState().lies.length === 0) {
      return (
        <p>No lies</p>
      );
    }
    return engine.getState().lies.map(lieItem => {
      let { lie } = lieItem;
      return (
        <button
          key={lie}
          onClick={this.submitAnswers.bind(this, lie)}>
          {lie}
        </button>
      );
    });
  }

  @autobind
  bindLie(e) {
    let lie = e.target.value;
    this.setState({
      lie: lie
    });
  }

  @autobind
  inputLie(e) {
    let { lie, gameCode } = this.state;
    let player = this.state.gamepadName;

    engine.gamepadInput({
      lie,
      player,
      gameCode
    });
  }

  @autobind
  inputName(e) {
    this.setState({
      gamepadName: e.target.value
    });
  }

  @autobind
  inputGameCode(e) {
    this.setState({
      gameCode: e.target.value
    })
  }

  @autobind
  gamepadJoin(e) {
    let payload = {
      name: this.state.gamepadName,
      gameCode: this.state.gameCode
    }
    engine.gamepadJoin(payload);
  }

  @autobind
  bindState() {
    this.setState({
      gameState: engine.getState()
    });
  }

  submitAnswers(answer) {
    let { gamepadName, gameCode } = this.state
    engine.gamepadInput({
      gameCode,
      answer,
      player: gamepadName
    });
  }

  static PropTypes = {}

  static defaultProps = {}

  static contextTypes = {}
}
