'use strict'

import mongoose from "mongoose"

const countConnect = async () => {
  const numConn = mongoose.connections.length

  return console.log(`Number of connect:: ${numConn}`)
}

export {
  countConnect,
}