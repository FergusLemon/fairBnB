'use strict';

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  environment: process.env.NODE_ENV,
  server: process.env.SERVER,
  secret: process.env.SESSION_SECRET
};
