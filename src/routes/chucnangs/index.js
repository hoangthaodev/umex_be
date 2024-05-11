'use strict'

import express from "express"
import { asyncHandle } from "../../helpers/asyncHandle.js"
import { authentication } from "../../auths/authUtil.js"
import chucnangController from "../../controllers/chucnang.controller.js"
const router = express.Router()

//authentication
router.use(asyncHandle(authentication))

//route
router.get('/', asyncHandle(chucnangController.getAllCN))
router.get('/:id', asyncHandle(chucnangController.getCNByCode))
router.post('/', asyncHandle(chucnangController.createCN))
router.patch('/update', asyncHandle(chucnangController.updateCN))
router.delete('/delete/:id', asyncHandle(chucnangController.deleteCN))


export default router