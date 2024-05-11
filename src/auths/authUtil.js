'use strict'

import JWT from "jsonwebtoken"
import { AuthErrorResponse, NotFoundResponse } from "../cores/error.response.js"
import KeyTokenService from "../services/keyToken.service.js"

const HEADER = {
  CLIENT_ID: 'client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'refreshtoken'
}

const createTokenPair = async (payload, publicKey, privateKey) => {

  console.log('payload::', payload)
  console.log('publicKey::', publicKey)

  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: '1 days'
  })
  const refreshToken = await JWT.sign(payload, privateKey, {
    expiresIn: '7 days'
  })

  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      console.log(`Error verify token:`, err)
    } else {
      console.log(`Decode token:`, decode)
    }
  })

  return { accessToken, refreshToken }
}

const authentication = async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthErrorResponse('Invalid request uid')

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundResponse('Not found keystore')

  if (req.headers[HEADER.REFRESHTOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN]
      const decodeUser = await JWT.verify(refreshToken, keyStore.privateKey)
      if (userId !== decodeUser.userId) throw new AuthErrorResponse('Invalid request ref')
      req.keyStore = keyStore
      req.user = decodeUser

      console.log('keyStore>::', req.keyStore)
      return next()
    } catch (error) {
      throw error
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthErrorResponse('Invalid request auth')
  try {
    const decodeUser = await JWT.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeUser.userId) throw new AuthErrorResponse('Invalid request')
    req.keyStore = keyStore
    req.user = decodeUser
    console.log('keyStore>::', req.keyStore)
    return next()
  } catch (error) {
    throw error
  }
}

export {
  createTokenPair,
  authentication,
}