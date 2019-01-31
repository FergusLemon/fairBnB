'use strict';
const moment = require('moment');

// This solution was taken from a Stack Overflow answer available here:
// https://stackoverflow.com/a/1056730
// It was used so as to avoid UTC offset issues identified with using the
// built in toISOString method that converts a date to a string following
// the ISO8601 extended format.
module.exports.format = function(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  return yyyy + "-" + (mm < 10 ? "0" + mm : mm) + "-" + (dd < 10 ? "0" + dd : dd);
};

module.exports.splitDate = function(dateRange) {
  return dateRange.split(' - ');
};

module.exports.prettify = function(collections) {
  collections.forEach( function(collection) {
    for ( const key in collection ) {
      let date = 'Date';
      let value = collection[key];
      if (key.includes(date)) {
        collection[key] = moment(value).format('MMMM Do YYYY, h:mm:ss a');
      }
    }
  });
  return collections;
};
