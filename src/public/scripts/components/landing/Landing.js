'use strict';

import React from 'react';

import { Link } from 'react-router';

export default class Landing extends React.Component {
	render() {
		return (
	        <div>
        		<div><Link to="/display/create">Create Room</Link></div>
        		<div><Link to="/gamepad/join">Join Room</Link></div>
			</div>
		);
	}
}