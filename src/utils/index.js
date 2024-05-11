'use strict'

import reasonPhrases from "./reasonPhrases.js"
import statusCodes from "./statusCodes.js"
import _ from "lodash"

const getInfoData = (fileds = [], object = {}) => {
  return _.pick(object, fileds)
}

const removeNullUndefine = obj => {
  Object.keys(obj).forEach(k => {
    if (obj[k] == null) {
      delete obj[k]
    }
  })

  return obj
}

export {
  getInfoData,
  reasonPhrases,
  statusCodes,
  removeNullUndefine,
}