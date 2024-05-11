'use strict'

import { Schema, Types, model } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
  user: {
    type: Types.ObjectId,
    require: true,
    ref: 'user',
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  refreshTokenUsed: {
    type: Array,
    default: []
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
});

//Export the model
export default model(DOCUMENT_NAME, keyTokenSchema);