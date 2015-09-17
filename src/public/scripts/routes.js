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
  NotFoundRoute
} from 'react-router';

export default (
  <Route name='app' path='/' component={App}>
    {/*<Route
      name='landing'
      path='/home'
      component={Landing} />
    <Route
       name='display.create'
       path='/display/create'
       component={Display.create} />
     <Route
       name='display.lobby'
       path='/display/lobby'
       component={Display.lobby} />
     <Route
       name='gamepad.join'
       path='/gamepad/join'
       component={Gamepad.join} />
     <Route
       name='gamepad.lobby'
       path='/gamepad/lobby'
       component={Gamepad.lobby} />*/}
   </Route>
);