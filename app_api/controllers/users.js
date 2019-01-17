'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

let sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
};

module.exports.createUser = (req, res) => {
  
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
