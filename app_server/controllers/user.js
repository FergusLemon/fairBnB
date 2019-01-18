'use strict';
const request = require('request');
let apiOptions = {
  server: "http://localhost:3000"
};

module.exports.new = (req, res) => {
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
    url: apiOptions.server + path,
    json: postData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        res.redirect('users/' + body.username);
      } else {
        res.send("Something went wrong with the database.");
      }
    }
  );
};

module.exports.overview = (req, res) => {
  var welcome = "Let's get started!";
  res.render('users/overview', { welcomeMessage: welcome });
};

module.exports.getBookingRequests = (req, res) => {
  res.render('users/bookingRequests', {
    bookingRequests: [{
      propertyName: 'Test Casa',
      propertyId: '1',
      requestorName: 'Test User',
      requestorId: '101',
      requestStartDate: '2019-12-25',
      requestEndDate: '2019-12-31',
      requestMadeDate: '2019-01-12'
    }]
  });
};
