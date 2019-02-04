# FairBnB

### Build Status & Coverage
[![Build Status](https://travis-ci.org/FergusLemon/fairBnB.svg?branch=master)](https://travis-ci.org/FergusLemon/fairBnB)
[![Coverage Status](https://coveralls.io/repos/github/FergusLemon/fairBnB/badge.svg)](https://coveralls.io/github/FergusLemon/fairBnB)
<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

Travis CI was chosen for continuous integration testing on this project.

### Technologies Used
##### Languages
   - Javascript

##### Back-end
   - NodeJs as the runtime environment and software platform to build the app and start up a web-server.
   - Express as the web-app framework and for setting up the web-server, routing, HTML templating etc...
   - Pug for the HTML template.
            
##### Database 
   - MongoDB with Mongoose as the ORM.

### Testing
##### Tools
  - Mocha and Chai for unit testing with Sinon for spies, stubs and mocks.
  - TestCafe for feature testing.
  - Postman for testing routes and API calls, on top of unit tests.
  - Istanbul for code coverage.
  - Travis CI for continous integration testing.


### Client Specifications

#### Headline specifications

1. Any signed-up user can list a new space.
2. Users can list multiple spaces.
3. Users should be able to name their space, provide a short description of the space, and a price per night.
4. Users should be able to offer a range of dates where their space is available.
5. Any signed-up user can request to hire any space for one night, and this should be approved by the user that owns that space.
6. Nights for which a space has already been booked should not be available for users to book.
7. Until a user has confirmed a booking request, that space can still be booked for that night.

#### Nice-to-haves

8. Users should receive an email whenever one of the following happens:
   - They sign up;
   - They create a space;
   - They update a space;
   - A user requests to book their space;
   - They confirm a request;
   - They request to book a space;
   - Their request to book a space is confirmed; and
   - Their request to book a space is denied.
9. Users should receive a text message to a provided number whenever one of the following happens:
   - A user requests to book their space;
   - Their request to book a space is confirmed; and
   - Their request to book a space is denied.
10. A 'chat' functionality once a space has been booked, allowing users whose space-booking request has been confirmed to chat with the user that owns that space.
