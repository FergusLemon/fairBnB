'use strict';

module.exports.validUserOne = () => {
  return {
    username: "test@testmail.com",
    password: "p@$$W0rd",
    firstname: "Tess",
    lastname: "User",
    phoneNumber: "+447777777777"
  };
};

module.exports.validUserTwo = () => {
  return {
    username: "user@usermail.com",
    password: "p@$$W0rd",
    firstname: "Another",
    lastname: "User",
    phoneNumber: "+4488888888888"
  };
};
