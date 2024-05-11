'use strict'

import express from "express"
import { asyncHandle } from "../../helpers/asyncHandle.js"
import userController from "../../controllers/user.controller.js"
import { authentication } from "../../auths/authUtil.js"
const router = express.Router()

//create login
router.post('/login', asyncHandle(userController.loginUser))

//authentication
router.use(asyncHandle(authentication))

//logout modifine delete refreshtoken
router.get('/', asyncHandle(userController.getAllUser))
router.get('/:id', asyncHandle(userController.getByIdUser))
router.post('/', asyncHandle(userController.createUser))
router.post('/logout', asyncHandle(userController.logoutUser))
router.patch('/update', asyncHandle(userController.updateUser))
router.delete('/delete/:id', asyncHandle(userController.deleteUser))


export default router