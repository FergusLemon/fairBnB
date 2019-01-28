'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String }
});

userSchema.pre('save', function(next) {
  let user = this;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

userSchema.virtual('fullName').get(function() {
  return this.firstname + " " + this.lastname;
});

module.exports = mongoose.model('User', userSchema);
