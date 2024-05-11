'use strict'

import { ErrorResponse, NotFoundResponse } from "../cores/error.response.js"
import chucnangModel from "../models/chucnang.model.js"
import { removeNullUndefine } from "../utils/index.js"

class ChucNangService {

  static getAll = async () => {
    const allCN = await chucnangModel.find()
    if (!allCN) throw new ErrorResponse('Get all cn error')

    return allCN
  }

  static getById = async (id) => {
    if (!id) throw new NotFoundResponse('id require')

    const getCN = await chucnangModel.findById(id)
    if (!getCN) throw new ErrorResponse('Get code cn error')

    return getCN
  }

  static create = async ({ cn_code, cn_name, cn_isActive = false }) => {
    if (!cn_code) throw new NotFoundResponse('cncode require')
    if (!cn_name) throw new NotFoundResponse('cnname require')

    const newCN = await chucnangModel.create({
      cn_code, cn_name, cn_isActive
    })
    if (!newCN) throw new ErrorResponse('Create cn error')

    return newCN
  }

  static updateById = async ({ id, cn_code, cn_name, cn_isActive }) => {
    if (!id) throw new NotFoundResponse('id require')

    const updates = removeNullUndefine({ id, cn_code, cn_name, cn_isActive }), options = { upsert: true, new: true }
    const modCN = await chucnangModel.findByIdAndUpdate(id, updates, options)
    if (!modCN) throw new ErrorResponse('Update cn error')

    return modCN
  }

  static deleteById = async (id) => {
    if (!id) throw new NotFoundResponse('id require')

    const delCN = await chucnangModel.findByIdAndDelete(id)
    if (!delCN) throw new ErrorResponse('Delete cn error')

    return delCN
  }
}

export default ChucNangService