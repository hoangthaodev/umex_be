'use strict'

import { statusCodes, reasonPhrases } from "../utils/index.js"

class SuccessResponse {
  constructor({ message, status = statusCodes.OK, reasonStatus = reasonPhrases.OK, metadata = {} }) {
    this.message = message ? message : reasonStatus
    this.status = status
    this.metadata = metadata
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this)
  }
}

export {
  SuccessResponse
}