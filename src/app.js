'use strict'
import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
dotenv.config()

const app = express()

// init midleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init db
import instanceDatabase from './dbs/init.mongodb.js'

// init router
import router from './routes/index.js'
app.use(router)

// handle error
app.use((req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  const errCode = error.status || 500
  return res.status(errCode).json({
    status: "Error",
    code: errCode,
    message: error.message || "Internal Server Error!"
  })
})

export default app