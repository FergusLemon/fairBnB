# FairBnB

### Build Status & Coverage
[![Build Status](https://travis-ci.org/FergusLemon/fairBnB.svg?branch=master)](https://travis-ci.org/FergusLemon/fairBnB)
[![Coverage Status](https://coveralls.io/repos/github/FergusLemon/fairBnB/badge.svg)](https://coveralls.io/github/FergusLemon/fairBnB)
<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

Travis CI was chosen for continuous integration testing on this project.

### Overview

A web application built according to the client specifications listed below to mimic a very basic Air BnB type website. Users can sign up, browse properties, add properties of their own for others to view, send booking requests to owners for dates when the property is available to rent. This project was completed as part of the Makers Academy course and the motivation for building it was to get experience writing Javascript as well as using different technologies such as Node, Express and Mongo DB and different testing frameworks and tools such as Mocha, Sinon and TestCafe. Open issues and thoughts on how to improve the project have been outlined in the Issues section.

![FairBnB Front End screenshots](/public/images/fairbnb.jpg)

### Client Specifications

#### Headline specifications

1. Any signed-up user can list a new space.
2. Users can list multiple spaces.
3. Users should be able to name their space, provide a short description of the space, and a price per night.
4. Users should be able to offer a range of dates where their space is available.
5. Any signed-up user can request to hire any space for one night, and this should be approved by the user that owns that space.
6. Nights for which a space has already been booked should not be available for users to book.
7. Until a user has confirmed a booking request, that space can still be booked for that night.

### Installation

- [ ] **Step 1** - Clone this repository by copying the link available at the top of this webpage in the green button labelled 'Clone or Download'. 
- [ ] **Step 2** - Open up a Terminal window (Mac OS) and run `git clone <link>` where `<link>` is what you copied in the previous step.
```
>> git clone https://github.com/FergusLemon/fairbnb.git
```
- [ ] **Step 3** - `cd` into the cloned directory.
- [ ] **Step 4** - Run the command `npm start` which will start a server listening on port 3000 and get a test database connection set up.  Open up your favourite browser and go to `http://localhost:3000`.  From there you can play with the functionality of the application.  Please note that the app has only been tested with respect to Google Chrome.

### Tests
Unit tests can be located in the `test` directory and can be run from the `fairBnB` directory using the command `npm test`. Feature tests can be found in the `test/feature` directory and can be run from the same home directory as the unit tests using the command `npm run featureTest`.  Open issues on this project include improving the code coverage, extending feature tests to Firefox, following up with the TestCafe team with a query on selecting non-visible elements without the need to use the size of the element and its position relative to the viewport and finally improve testing of AJAX calls.

### Testing
##### Tools
  - Mocha and Chai for unit testing with Sinon for spies and stubs.
  - TestCafe for feature testing.
  - Postman for testing routes and API calls, on top of unit tests.
  - Istanbul/NYC for code coverage.
  - Travis CI for continous integration testing.

### Technologies Used
##### Languages
   - Javascript
   - CSS

##### Back-end
   - NodeJs as the runtime environment and software platform to build the app and start up a web-server.
   - Express as the web-app framework and for setting up the web-server, routing, HTML templating etc...
   
##### Front-end
   - Pug for HTML templating.
   - jQuery for AJAX calls.
            
##### Database 
   - MongoDB with Mongoose as the ORM.
   - Redis for session storage because the express-session middleware defaults to storing session data in memory, which is not suitable for production.
   
##### Other
   - Dan Grossman's date range picker was used to allow user's to select a date range for a booking request on a property and also to block out dates for which the property was unavailable.  It comes with good documentation and it was easy to work with and integrate.  It is [avaialble here](https://github.com/dangrossman/daterangepicker), give it a star if you like it.
   - Cloudinary was used as a cloud service for storing images uploaded by the user (an image of their property).  After looking at various options (restricting users to small images and storing directly in Mongo or larger images using GridFS) the simplicity of the Cloudinary solution won over.  [This superb blog post](https://medium.freecodecamp.org/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9) by Glyn Lewington is all you need to get up and running in no time. When a user doesn't upload an image a stock image is used, the photo chosen was taken by [Sarah Trummer](https://www.pexels.com/@sarah-trummer-155385?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) and available for use on the [Pexels website](https://www.pexels.com/photo/microphotography-of-orange-and-blue-house-miniature-on-brown-snail-s-back-955793/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels).
   - Passport JS used for authentication because it was relatively easy to set up and was a better solution than trying to write custom logic.
   - Bcrypt for encryption because it appears the best choice for the combination of excellent security and ease of use.
   - A REST API was built to interface with the application data because, amongst other things, it would make it easier to connect to an iOS app or React app if required.
   
![FairBnB Deisgn screenshot](/public/images/design.jpg)


### License
MIT (c) 2019 Fergus Lemon

See `MIT.LICENSE` for more detail.
