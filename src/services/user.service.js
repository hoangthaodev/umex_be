'use strict'

import { ConflictResponse, ErrorResponse, NotFoundResponse } from "../cores/error.response.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import crypto from "node:crypto"
import { createTokenPair } from "../auths/authUtil.js"
import KeyTokenService from "./keyToken.service.js"
import { getInfoData, removeNullUndefine } from "../utils/index.js"

class UserService {

  static create = async ({ user_name, user_account, user_password, user_role = [], user_chucnang = [] }) => {
    if (!user_account) throw new NotFoundResponse('Account require!')

    const holderUser = await userModel.findOne({ user_account }).lean()
    if (holderUser) throw new ConflictResponse('User already registered!')

    const passwordHash = await bcrypt.hash(user_password, 10)
    const newUser = await userModel.create({
      user_name, user_account, user_password: passwordHash, user_role, user_chucnang
    })
    // const publicKey = crypto.randomBytes(64).toString('hex')
    // const privateKey = crypto.randomBytes(64).toString('hex')

    // const { _id: userId } = newUser._id
    // const tokens = await createTokenPair({ userId, user_account }, publicKey, privateKey)

    // await KeyTokenService.createKeyToken({
    //   userId, publicKey, privateKey, refreshToken: tokens.refreshToken
    // })

    return {
      user: getInfoData(['_id', 'user_name', 'user_account'], newUser),
      // tokens
    }

  }

  static login = async ({ user_account, user_password }) => {
    if (!user_account) throw new NotFoundResponse('Account require')

    const foundUser = await userModel.findOne({ user_account }).lean()
    if (!foundUser) throw new NotFoundResponse('User not registered')

    const verifyPass = await bcrypt.compare(user_password, foundUser.user_password)
    if (!verifyPass) throw new ErrorResponse('password not match')

    const hasToken = await KeyTokenService.findByUserId(foundUser._id)

    if (hasToken) {
      await KeyTokenService.deleteById(hasToken._id)
    }
    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    const { _id: userId } = foundUser._id
    const tokens = await createTokenPair({ userId, user_account }, publicKey, privateKey)

    await KeyTokenService.createKeyToken({
      userId, publicKey, privateKey, refreshToken: tokens.refreshToken
    })

    return {
      user: getInfoData(['_id', 'user_name', 'user_account'], foundUser),
      tokens
    }

  }

  static logout = async (keyStore) => {
    const delkey = await KeyTokenService.deleteById(keyStore._id)
    if (!delkey) throw new ErrorResponse('Logout wrong!')
    return delkey
  }

  static updateById = async ({ id, user_name, user_account, user_password, user_role, user_chucnang }) => {
    if (!id) throw new NotFoundResponse('id require')

    const updates = removeNullUndefine({ id, user_name, user_account, user_password, user_role, user_chucnang }), options = { upsert: true, new: true }
    const modU = await userModel.findByIdAndUpdate(id, updates, options)
    if (!modU) throw new ErrorResponse('Modifine user error')

    return modU
  }

  static deleteById = async (id) => {
    if (!id) throw new NotFoundResponse('id require')

    const delU = await userModel.findByIdAndDelete(id)
    if (!delU) throw new ErrorResponse('Delete user error')

    return delU
  }

  static getAll = async () => {

    const user = await userModel.find()
    if (!user) throw new ErrorResponse('get all user error')

    return user
  }

  static getById = async (id) => {
    if (!id) throw new NotFoundResponse('id require')

    const user = await userModel.findById(id)
    if (!user) throw new ErrorResponse('get user error')

    return user
  }

}

export default UserService