'use strict';

import 'es6-shim';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory'

React.render(<Router history={createBrowserHistory()}>{routes}</Router>, document.getElementById('root'));
