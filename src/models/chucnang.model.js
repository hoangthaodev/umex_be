'use strict'

import { Schema, Types, model } from 'mongoose'; // Erase if already required

const DOCUMENT_NAME = "ChucNang";
const COLLECTION_NAME = "ChucNangs";

// Declare the Schema of the Mongo model
const chucnangSchema = new Schema({
  cn_code: {
    type: String,
    require: true,
    unique: true,
  },
  cn_name: {
    type: String,
    required: true,
  },
  cn_isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
});

//Export the model
export default model(DOCUMENT_NAME, chucnangSchema);
