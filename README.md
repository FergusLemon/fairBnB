# FairBnB

### Build Status
[![Build Status](https://travis-ci.org/FergusLemon/fairBnB.svg?branch=master)](https://travis-ci.org/FergusLemon/fairBnB)

Travis CI was chosen for continuous integration testing on this project.

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
11. Basic payment implementation though Stripe.
