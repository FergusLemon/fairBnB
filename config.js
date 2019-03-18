'use strict';

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  environment: process.env.NODE_ENV,
  server: (process.env.NODE_ENV === 'test' ? process.env.SERVER : process.env.H_SERVER),
  secret: process.env.SESSION_SECRET,
  herokuHost: process.env.H_REDIS_HOST,
  cloudName: process.env.CLOUD_NAME,
  cloudApi: process.env.CLOUD_API,
  cloudSecret: process.env.CLOUD_SECRET,
  stockImageUrl: process.env.URL,
  stockImageId: process.env.PUBLIC_ID
};
