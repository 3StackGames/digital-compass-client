'use strict';

import React from 'react';
import engine from '../../engine';

export default class Join extends React.Component {
	constructor(props) {
		super(props);
		this.state = { gameState: this.engineState }

		this.handlePlayerJoin = this.handlePlayerJoin.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props.gameState == undefined) return;

		this.setState({ gameState: props.gameState });
	}

	handlePlayerJoin(e) {
		e.preventDefault();

		let name = this.refs.name.getDOMNode().value.trim();
		let id = this.refs.code.getDOMNode().value.trim();

		let warning = document.getElementById('warning');

		warning.innerHTML = '';

		if(!name || !id)
		{
			warning.innerHTML  = 'All fields need to be filled out!';
			return;
		}

		engine.joinPlayer({ name, id });
	}

	render() {
		return (
			<form onSubmit={ this.handlePlayerJoin }>
				<div id="warning"></div>
				<input type="text" ref="name" placeholder="Player Name" />
				<input type="text" ref="code" placeholder="Room ID" />
				<button>Join Room</button>
			</form>
		);
	}
}