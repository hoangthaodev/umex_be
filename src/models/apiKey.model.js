'use strict'

import { Schema, Types, model } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

// Declare the Schema of the Mongo model
const apiKeySchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  permision: {
    type: [String],
    require: true,
    enum: ['0000', '1111', '2222'],
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
});

//Export the model
export default model(DOCUMENT_NAME, apiKeySchema);