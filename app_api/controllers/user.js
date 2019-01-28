'use strict';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'user'));

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createUser = (req, res) => {
  var user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, user);
    }
  });
};
