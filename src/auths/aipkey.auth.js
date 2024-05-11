'use strict'

import { getApiKey } from "../services/apiKey.service.js"

const HEADER = {
  API_KEY: "x-api-key"
}

const checkApi = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]
  if (!key) {
    return res.status(200).json({
      message: "api key require!",
    })
  }

  const objKey = await getApiKey(key)
  if (!objKey) {
    return res.status(200).json({
      message: "wrong api key"
    })
  }
  req.objKey = objKey
  return next()
}

const checkPermission = (permision) => {
  return (req, res, next) => {
    if (!req.objKey.permision.includes(permision)) {
      return res.status(200).json({
        message: "Permisison denied"
      })
    }
    return next()
  }
}

export {
  checkApi,
  checkPermission,
}