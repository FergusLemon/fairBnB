'use strict';
$(document).ready(function () {
  $('input[name="dates"]').daterangepicker({
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " - ",
    }
  });
});
