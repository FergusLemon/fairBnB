'use strict';

let sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
};

module.exports.index = function(req, res) {
  sendJsonResponse(res, 200, { "status": "success" } );
};
