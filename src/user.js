'use strict';

function User(obj) {

  if(!obj || !obj.username) throw new Error;

  this.getUsername = function() {
    return obj.username;
  };
};

 module.exports = User;
