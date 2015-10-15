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
let socketEngine = SocketEngine(local);

export default socketEngine;
