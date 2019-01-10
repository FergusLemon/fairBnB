var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/FairBNB';
mongoose.connect(dbURI, {useNewUrlParser: true});

mongoose.connection.on('connected', function() {
  console.log("Mongoose conncected to " + dbURI);
});

mongoose.connection.on('disconnected', function() {
  console.log("Mongoose disconnected");
});

mongoose.connection.on('error', function(err) {
  console.log("Mongoose conncection error: " + err);
});

var gracefulShutDown = function(msg, callback) {
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
