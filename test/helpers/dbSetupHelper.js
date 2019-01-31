'use strict';

const mongoose = require('mongoose');

module.exports.dropCollection = async (collection) => {
  await mongoose.connection.dropCollection(collection, (err) => {
    console.log(collection + " collection dropped successfully.");
  })
};

module.exports.closeConnection = async () => {
  await mongoose.connection.close((err) => {
    console.log("Connection to database closed successfully.");
  })
};
