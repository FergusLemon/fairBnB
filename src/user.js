'use strict';

function User(userDetails) {

  this.invalidDetails = function() {
    if(!userDetails || !userDetails.username ||
    !userDetails.firstname || !userDetails.lastname) return true;
  };

  if(this.invalidDetails()) throw new Error("A user must have a username,\
 first name and a last name.");

  this.getUsername = function() {
    return userDetails.username;
  };

}

 module.exports = User;
