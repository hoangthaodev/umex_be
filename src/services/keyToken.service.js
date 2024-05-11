'use strict'

import keyTokenModel from "../models/keyToken.model.js"

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    const filter = { user: userId }, update = {
      publicKey, privateKey, refreshToken
    }, options = { upsert: true, new: true }

    const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

    return tokens ? tokens.publictKey : null

  }

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean()
  }

  static deleteById = async (id) => {
    console.log('id::', id)
    return await keyTokenModel.deleteOne({ _id: id })
  }
}

export default KeyTokenService