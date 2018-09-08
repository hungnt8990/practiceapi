'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  //var ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * User Schema
 */
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  fullname: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', UserSchema);