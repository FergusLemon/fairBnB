'use strict';

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String }
});

userSchema.virtual('fullName').get(function() {
  return this.firstname + " " + this.lastname;
});

userSchema.methods.getUser = function(cb) {
  this.model('User').find({
    username: this.username
  }, function(err, val) {
    cb(!!val);
  });
};

module.exports = mongoose.model('User', userSchema);
