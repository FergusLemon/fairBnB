'use strict';

const mongoose = require('mongoose');

module.exports.setUpTestDatabase = () => {
  let mongoDB = 'mongodb://localhost/TestFairBnB';
  mongoose.connect(mongoDB, { useNewUrlParser: true } );
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports.dropCollection = async (collection) => {
  await mongoose.connection.db.dropCollection(collection, (err) => {
    console.log(collection + " collection dropped successfully.");
  })
};

module.exports.closeConnection = async () => {
  await mongoose.connection.close((err) => {
    console.log("Connection to database closed successfully.");
  })
};
