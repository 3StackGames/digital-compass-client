'use strict';

import React from 'react';
import engine from './engine';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = engine.gameState.state;
  }

  componentWillMount() {
    engine.gameState.addStateListener(this.bindState.bind(this));
    this.setState(engine.gameState.state);
  }

  componentWillUnmount() {
    engine.gameState.removeStateListener(this.bindState.bind(this));
  }

  render() {
    return (
      <div>
        <button onClick={this.joinPlayer.bind(this)}>
          Join Player
        </button>
        <button onClick={this.submitAnswers.bind(this)}>
          Submit Answers
        </button>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }

  bindState() {
    this.setState(engine.gameState.state);
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