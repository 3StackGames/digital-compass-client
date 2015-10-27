'use strict';

import { SocketEngine } from 'digital-compass-client';

const jason = {
  host: '192.168.0.109',
  port: 3333,
  debug: true
};
const local = {
  host: 'localhost',
  port: 3333,
  debug: true
};

let mode;
if (process.env.NODE_ENV === 'local') mode = local
else if (process.env.NODE_ENV === 'jason') mode = jason
else mode = local
let socketEngine = SocketEngine(mode);

export default socketEngine;
