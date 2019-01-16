'use strict';

function ValidObject(details){
  for (var property in details) {
    if (details.hasOwnProperty(property)) {
      this[property] = details[property];
    }
  }
}

ValidObject.prototype.removePath = function (path) {
  this[path] = '';
  return this;
};

module.exports = ValidObject;
