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
      today = moment();
  $('input[name="dates"]').daterangepicker({
    "startDate": today,
    "endDate": today,
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " - "
      },
      "isInvalidDate": function(date) {
        let formattedDate = date.format('YYYY-MM-DD');
        let formattedToday = today.format('YYYY-MM-DD');
        return (unavailableDates.includes(formattedDate) || formattedDate < formattedToday);
      }
  });
}
