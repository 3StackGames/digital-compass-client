'use strict'

function validatePayload(payload, ...args) {
  args.forEach(arg => {
    if (!payload[arg]) throw Error(`payload does not have "${arg}" field`)
  })
}

export {
  validatePayload
}
