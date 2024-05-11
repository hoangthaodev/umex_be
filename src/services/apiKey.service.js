'use strict'

import apiKeyModel from "../models/apiKey.model.js"
import crypto from "node:crypto"

const getApiKey = async (key) => {
  //check co api nao k
  // neu khong thi tao moi
  const hasKey = await apiKeyModel.find()
  if (hasKey.length === 0) {
    await createApiKey();
  }
  return await apiKeyModel.findOne({ key }).lean()
}

const createApiKey = async () => {
  return await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permision: ['0000'] })
}

export {
  getApiKey,
}