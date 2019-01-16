'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

let sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
};

module.exports.getUser = function(req, res) {
  sendJsonResponse(res, 200, { "status": "success" } );
};
