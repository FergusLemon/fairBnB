'use strict';
$(document).ready(function () {
  $('.datepicker').datepicker({
    assumeNearbyYear: true,
    endDate: "+365d",
    format: "dd/mm/yyyy",
    startDate: "0d",
    todayHighlight: true
  });
});
