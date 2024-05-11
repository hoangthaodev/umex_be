'use strict'

import { SuccessResponse } from "../cores/success.response.js"
import ChucNangService from "../services/chucnang.service.js"

class ChucNangController {

  getAllCN = async (req, res, next) => {
    new SuccessResponse({
      message: 'Create CN Success',
      metadata: await ChucNangService.getAll()
    }).send(res)
  }

  getCNByCode = async (req, res, next) => {
    new SuccessResponse({
      message: 'Create CN Success',
      metadata: await ChucNangService.getById(req.params.id)
    }).send(res)
  }

  createCN = async (req, res, next) => {
    new SuccessResponse({
      message: 'Create CN Success',
      metadata: await ChucNangService.create(req.body)
    }).send(res)
  }

  updateCN = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update CN Success',
      metadata: await ChucNangService.updateById(req.body)
    }).send(res)
  }

  deleteCN = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete CN Success',
      metadata: await ChucNangService.deleteById(req.params.id)
    }).send(res)
  }
}

export default new ChucNangController()