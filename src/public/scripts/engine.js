'use strict';

import { SocketEngine } from './digital-compass';

let socketEngine = new SocketEngine({
  host: 'localhost',
  port: 3000
});

export default socketEngine;