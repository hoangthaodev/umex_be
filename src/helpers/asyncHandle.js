'use strict'

const asyncHandle = fx => {
  return (req, res, next) => {
    fx(req, res, next).catch(next)
  }
}

export {
  asyncHandle,
}