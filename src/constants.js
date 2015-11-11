'use strict'

const events = {
  CONNECT: 'connect',
  DISPLAY_JOIN: 'Display Join',
  DISPLAY_JOIN_REJECTED: 'Display Join Rejected',
  GAMEPAD_JOIN: 'Gamepad Join',
  GAMEPAD_JOIN_REJECTED: 'Gamepad Join Rejected',
  STATE_UPDATE: 'State Update',
  DISPLAY_ACTION_COMPLETE: 'Display Action Complete',
  GAMEPAD_INPUT: 'Gamepad Input',
  BEGIN_GAME: 'Begin Game',
}

const devices = {
  DISPLAY: 'display',
  GAMEPAD: 'gamepad',
  SERVER: 'server'
}

export {
  events,
  devices
}
