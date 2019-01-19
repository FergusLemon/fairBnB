'use strict';

const mongoose = require('mongoose');
const User = require('../models/users');

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
