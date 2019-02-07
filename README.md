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
   
##### Front-end
   - Pug for HTML templating.
   - jQuery for some AJAX calls.
            
##### Database 
   - MongoDB with Mongoose as the ORM.
   
#### Other
   - Dan Grossman's date range picker was used to allow user's to select a date range for a booking request on a property and also to block out dates for which the property was unavailable.  It comes with good documentation and I found it very easy to work with and integrate.  It is [avaialble here](https://github.com/dangrossman/daterangepicker), give it a star if you like it.
   - Cloudinary was used as a cloud service for storing images uploaded by the user (an image of their property).  After looking at various options (restricting users to small images and storing directly in Mongo or larger images using GridFS) the simplicity of the Cloudinary solution won over.  [This superb blog post](https://medium.freecodecamp.org/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9) by Glyn Lewington is all you need to get up and running and no time. When a user doesn't upload an image a stock image is used, the photo I chose was taken by [Sarah Trummer](https://www.pexels.com/@sarah-trummer-155385?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) and available for use on the [Pexels website](https://www.pexels.com/photo/microphotography-of-orange-and-blue-house-miniature-on-brown-snail-s-back-955793/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels).

### Testing
##### Tools
  - Mocha and Chai for unit testing with Sinon for spies and stubs.
  - TestCafe for feature testing.
  - Postman for testing routes and API calls, on top of unit tests.
  - Istanbul/NYC for code coverage.
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
