'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const passport = require(path.join(HOMEDIR, 'app_server', 'auth'));
const { server } = require(path.join(HOMEDIR, 'config'));

module.exports.getSignUpForm = (req, res) => {
  res.render('users/new');
};

module.exports.createUser = (req, res) => {
  let postData = {
    username: req.body.username,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    phoneNumber: req.body.phoneNumber
  };
  let path = "/api/users";
  request.post( {
    url: server + path,
    json: postData
  },
    (err, response, user) => {
      if (response.statusCode === 201) {
        passport.authenticate('local-signIn')(req, res, () => {
          let id = req.session.passport.user;
          res.redirect('session/' + id);
        });
      } else {
        res.send("Something went wrong with the database.");
      }
    }
  );
};

module.exports.getUserHomepage = (req, res) => {
  let welcome = "Let's get started!";
  res.render('users/overview', { welcomeMessage: welcome });
};

module.exports.getAllInboundBookingRequests = (req, res) => {
  let ownerId = req.params.username;
  let path = "/api/bookingRequests/" + ownerId;
  request.get({
    url: server + path
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let bookingRequests = JSON.parse(body);
        res.render('users/bookingRequests', { bookingRequests: bookingRequests });
      } else {
        res.send("Something went wrong with the database.");
      }
  });
};
