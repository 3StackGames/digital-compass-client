'use strict';

import React from 'react';
import {
  App,
  Display,
  Gamepad,
  Landing
} from './components';

import {
  Route,
  Redirect,
  NotFoundRoute,
  IndexRoute
} from 'react-router';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Landing } />
    <Route
       path='display/create'
       component={ Display.create } />
     <Route
       path='display/lobby'
       component={ Display.lobby } />
     <Route
       path='gamepad/join'
       component={ Gamepad.join } />
     <Route
       path='gamepad/lobby'
       component={ Gamepad.lobby } />
  </Route>
);