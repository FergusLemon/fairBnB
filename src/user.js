'use strict';

function User(obj) {

  this.invalidUserDetails = function() {
    if(!obj || !obj.username || !obj.firstname || !obj.lastname) return true;
  };

  if(this.invalidUserDetails()) throw new Error("A user must have a username, first name and a last name.");

  this.getUsername = function() {
    return obj.username;
  };

}

 module.exports = User;
