'use strict';
const mongoose = require('mongoose');

let mongoDbUri = 'mongodb://localhost/TestFairBnB';
if (process.env.NODE_ENV === 'production') {
console.log("hello inside production");
  mongoDbUri = process.env.MONGODB_URI;
}

console.log(mongoDbUri);

mongoose.connect(mongoDbUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

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

db.once('connected', function() {
  console.log("Mongoose conncected to " + mongoDbUri );
});

db.once('disconnected', function() {
  console.log("Mongoose disconnected");
});

db.on('error', function(err) {
  console.log("Mongoose conncection error: " + err);
});

const gracefulShutDown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
  });
};

process.once('SIGHUP', function() {
  gracefulShutDown('nodemon restart', function() {
    process.kill(process.pid, 'SIGHUP');
  });
});

process.on('SIGINT', function() {
  gracefulShutDown('app termination', function() {
    process.exit(0);
  });
});
