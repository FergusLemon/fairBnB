'use strict';
$(document).ready(function () {
  console.log(window.location.pathname);
  $('input[name="dates"]').daterangepicker({
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " - "
      },
      "isInvalidDate": function(date) {
        let unavailableDates = ['2019-02-21'];
        console.log(date.format('YYYY-MM-DD'));
        let formattedDate = date.format('YYYY-MM-DD');
        console.log(unavailableDates.includes(formattedDate));
        return unavailableDates.includes(formattedDate);
      }
  });
});
