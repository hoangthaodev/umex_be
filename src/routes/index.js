'use strict'

import express from "express"
import { checkApi, checkPermission } from "../auths/aipkey.auth.js"
const router = express.Router()
import user from "./users/index.js"
import chucnang from "./chucnangs/index.js"

// check api
router.use(checkApi)

// check permision 
router.use(checkPermission('0000'))

// router
router.use('/v1/user', user)
router.use('/v1/chucnang', chucnang)

export default router