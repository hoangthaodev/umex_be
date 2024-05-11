'use strict'

import { Schema, Types, model } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model
const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_account: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_role: {
    type: [String],
    default: []
  },
  user_chucnang: {
    type: [String],
    default: []
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
});

//Export the model
export default model(DOCUMENT_NAME, userSchema);