const mongoose = require('mongoose');
const { environment } = require('../../config');
require('./users');
let mongoDbUri;

if ( `$environment` === "test" ) {
  mongoDbUri = 'mongodb://localhost/TestFairBnB';
} else {
  mongoDbUri = 'mongodb://localhost/DevFairBnB';
}

mongoose.connect(mongoDbUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.on('connected', function() {
  console.log("Mongoose conncected to " + mongoDbUri );
});

db.on('disconnected', function() {
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

process.once('SIGUSR2', function() {
  gracefulShutDown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutDown('app termination', function() {
    process.exit(0);
  });
});
