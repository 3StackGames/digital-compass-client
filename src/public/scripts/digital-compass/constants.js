'use strict'

const events = {
  CONNECT: 'connect',
  DISPLAY_JOIN: 'Display Join',
  GAMEPAD_JOIN: 'Gamepad Join',
  STATE_UPDATE: 'State Update',
  DISPLAY_ACTION_COMPLETE: 'Display Action Complete',
  GAMEPAD_INPUT: 'Gamepad Input',
  BEGIN_GAME: 'Begin Game'
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
