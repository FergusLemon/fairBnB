'use strict';
$(document).ready(function () {
  let pathname = window.location.pathname,
      listingIdMatch = pathname.match(/\w+$/),
      listingId = listingIdMatch[0];
  getUnavailableDates(listingId, blockDates);
});

function getUnavailableDates(listingId, callback) {
  $.ajax({
    type: 'GET',
    url: '/api/listings/' + listingId,
    success: callback,
    error: function(err) {
      console.log(err);
    }
  });
}

function blockDates(result) {
  let unavailableDates = result.datesUnavailable,
      today = moment(),
      start = calculateStart(today);
  function isInvalidDate(date) {
    let formattedDate = date.format('YYYY-MM-DD'),
        formattedToday = today.format('YYYY-MM-DD');
    return (unavailableDates.includes(formattedDate) || formattedDate < formattedToday);
  }
  function calculateStart(date) {
    while (isInvalidDate(date)) {
      date = date.add(1, 'd');
    }
    return date;
  }
  $('input[name="dates"]').daterangepicker({
    "startDate": start,
    "endDate": start,
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " - "
      },
      "isInvalidDate": isInvalidDate
  });
}
