'use strict';
$(document).ready(function () {
  $('.datepicker').datepicker({
    assumeNearbyYear: true,
    endDate: "+365d",
    format: "yyyy-mm-dd",
    startDate: "0d",
    todayHighlight: true
  });
});
