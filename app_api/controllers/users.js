'use strict';

const mongoose = require('mongoose');
const User = require('../models/users');

let sendJsonResponse = function(res, status, content) {
  console.log(status);
  console.log(content);
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
//module.exports.getUser = function(req, res) {
//  if (req.params && req.params.userid) {
//    User
//      .findById(req.params.userid)
//      .exec((err, user) => {
//        if(!user) {
//          sendJsonResponse(res, 404, {
//            "message": "Sorry this user cannot be found."
//          });
//          return;
//        } else if (err) {
//          sendJsonResponse(res, 404, err);
//          return;
//        }
//        sendJsonResponse(res, 200, user);
//      });
//    } else {
//      sendJsonResponse(res, 404, {
//        "message": "No User ID was sent with the request."
//      });
//    }
//};
