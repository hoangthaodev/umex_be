'use strict'

import { reasonPhrases, statusCodes } from "../utils/index.js"

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class NotFoundResponse extends ErrorResponse {
  constructor(message = reasonPhrases.NOT_FOUND, status = statusCodes.NOT_FOUND) {
    super(message, status)
  }
}

class ConflictResponse extends ErrorResponse {
  constructor(message = reasonPhrases.CONFLICT, status = statusCodes.CONFLICT) {
    super(message, status)
  }
}

class AuthErrorResponse extends ErrorResponse {
  constructor(message = reasonPhrases.UNAUTHORIZED, status = statusCodes.UNAUTHORIZED) {
    super(message, status)
  }
}

export {
  ErrorResponse,
  NotFoundResponse,
  ConflictResponse,
  AuthErrorResponse
}