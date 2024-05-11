'use strict'

import dotenv from "dotenv"
dotenv.config()

const config = {
  dev: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'umexDEV',
  },
  pro: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'umexPRO',
  },
}

const env = process.env.NODE_ENV || 'dev'

const configMongo = config[env]

export default configMongo