'use strict'

import { SuccessResponse } from "../cores/success.response.js"
import UserService from "../services/user.service.js"

class UserController {
  createUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Create User Success!",
      metadata: await UserService.create(req.body)
    }).send(res)
  }

  loginUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Login Success!",
      metadata: await UserService.login(req.body)
    }).send(res)
  }

  logoutUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout Success!",
      metadata: await UserService.logout(req.keyStore)
    }).send(res)
  }

  updateUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Update Success!",
      metadata: await UserService.updateById(req.body)
    }).send(res)
  }

  deleteUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete Success!",
      metadata: await UserService.deleteById(req.params.id)
    }).send(res)
  }

  getAllUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Get All Success!",
      metadata: await UserService.getAll()
    }).send(res)
  }

  getByIdUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Get user Success!",
      metadata: await UserService.getById(req.params.id)
    }).send(res)
  }
}

export default new UserController()