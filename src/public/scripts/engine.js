'use strict';

import { SocketEngine } from './digital-compass';

const jason = {
  host: '192.168.0.109',
  port: 3333
};
const local = {
  host: 'localhost',
  port: 3000
};
let socketEngine = new SocketEngine(jason);

export default socketEngine;
