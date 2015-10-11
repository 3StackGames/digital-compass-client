'use strict';

import 'es6-shim';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

React.render(<Router>{routes}</Router>, document.getElementById('root'));
