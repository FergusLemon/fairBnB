'use strict';

function User(userDetails) {

  this.properties = [];

  this.invalidDetails = function() {
    if(!userDetails || !userDetails.username ||
    !userDetails.firstname || !userDetails.lastname) return true;
  };

  if(this.invalidDetails()) throw new Error("A user must have a username,\
 first name and a last name.");

  this.getUsername = function() {
    return userDetails.username;
  };

  this.addProperty = function(property) {
    this.properties.push(property);
    return true;
  };

  this.getProperties = function() {
    return this.properties;
  };

}

 module.exports = User;
