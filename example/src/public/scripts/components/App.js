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
    engine.addStateListener(this.bindState);
    this.setState({
      gameState: engine.getState()
    });
  }

  componentWillUnmount() {
    engine.removeStateListener(this.bindState);
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
            onClick={() => { engine.displayActionComplete({ gameCode: this.state.gameState.gameCode })}}>
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
          {this.packSelection}
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

  currentPhase(phaseName) {
    return this.state.gameState
        && this.state.gameState.currentPhase
        && this.state.gameState.currentPhase.phaseName === phaseName
  }

  get packSelection() {
    if (!this.currentPhase('PackSelectionPhase')) return
    return (
      <div>
        <p>Pack selection:</p>
        {this.packButtons}
        {this.submitPackButton}
      </div>
    )
  }

  get packButtons() {
    let packs = this.state.gameState.packOptions
    return packs.map(pack => {
      console.log(pack)
      return (
        <button
          key={pack}
          onClick={() => this.addPackSelection(pack)}>
          {pack}
        </button>
      )
    })
  }

  get submitPackButton() {
    return (
      <button onClick={this.submitPackSelection}>
        Submit Pack Selection
      </button>
    )
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
  addPackSelection(pack) {
    let packs = this.state.packSelections || []
    packs.push(pack)
    this.setState({
      packSelections: packs
    })
  }

  @autobind
  submitPackSelection() {
    let { packSelections, gameCode } = this.state
    let player = this.state.gamepadName

    engine.gamepadInput({
      player,
      gameCode,
      packs: packSelections
    })
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
    let choices = engine.getState().lies.map(lieItem => {
      let { lie } = lieItem;
      return (
        <button
          key={lie}
          onClick={this.submitAnswers.bind(this, lie)}>
          {lie}
        </button>
      );
    });
    choices.push(<button onClick={this.submitAnswers.bind(this, this.state.gameState.currentQuestion.answer)}>{this.state.gameState.currentQuestion.answer}</button>)
    return choices;
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
