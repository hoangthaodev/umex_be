'use strict'

import mongoose from "mongoose"
import configMongo from "../configs/mongodb.config.js"
import { countConnect } from "../helpers/checkConnect.js"

const connectStr = `mongodb://${configMongo.host}:${configMongo.port}/${configMongo.name}`

console.log(connectStr)

class Database {
  constructor() {
    this.connection()
  }

  connection() {
    mongoose.connect(connectStr)
      .then(_ => console.log(`Connection Database Success!`, countConnect()))
      .catch(err => console.log(`Error Connection!`, err))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceDatabase = Database.getInstance()

export default instanceDatabase