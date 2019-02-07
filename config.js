'use strict';

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  environment: process.env.NODE_ENV,
  server: process.env.SERVER,
  secret: process.env.SESSION_SECRET,
  cloudName: process.env.CLOUD_NAME,
  cloudApi: process.env.CLOUD_API,
  cloudSecret: process.env.CLOUD_SECRET,
  stockImageUrl: process.env.URL,
  stockImageId: process.env.PUBLIC_ID
};
