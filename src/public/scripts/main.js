'use strict';

import 'es6-shim';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import createHashHistory from 'history/lib/createHashHistory'

React.render(<Router history={createHashHistory()}>{routes}</Router>, document.getElementById('root'));
