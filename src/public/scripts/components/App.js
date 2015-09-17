'use strict';

import React from 'react';
import engine from '../engine';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameState: this.engineState }

    this.engineState = engine.gameState.state;
    this.bindState = this.bindState.bind(this);
  }

  componentWillMount() {
    engine.gameState.addStateListener(this.bindState);
    this.setState({
      gameState: this.engineState
    });
  }

  componentWillUnmount() {
    engine.gameState.removeStateListener(this.bindState);
  }

  render() {
    return <div>{ React.cloneElement(this.props.children, { gameState: this.engineState }) }</div>;
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