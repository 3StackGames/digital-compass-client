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
  }

  componentWillUnmount() {
    engine.gameState.removeStateListener(this.bindState.bind(this));
  }

  render() {
    return (
      <div>
        Landing
      </div>
    );
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