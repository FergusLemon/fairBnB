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
      let made = 'Made';
      let date = 'Date';
      let value = collection[key];
      if (key.includes(made)) {
        collection[key] = moment(value).format('MMM Do YYYY, hh:mm');
      } else if ( key.includes(date) ) {
        collection[key] = moment(value).format('MMM Do YYYY');
      }
    }
  });
  return collections;
};

module.exports.iso = function(date) {
  return moment(date, "MMM Do YYYY").toISOString();
};

module.exports.datesInARange = function(start, end) {
  let firstDay = convertToDashedFormat(start);
  let lastDay = convertToDashedFormat(end);
  let dates = [],
      count = 1,
      day = convertToDashedFormat(incrementDay(firstDay, count));
  dates.push(firstDay);
  while (day < lastDay) {
    dates.push(day);
    count++;
    day = convertToDashedFormat(incrementDay(firstDay, count));
  }
  dates.push(lastDay);
  return dates;
};

function convertToDashedFormat(date) {
  return moment(date, 'MMM Do YYYY').format('YYYY-MM-DD');
}

function incrementDay(date, count) {
  return moment(date).add(count, 'd');
}
