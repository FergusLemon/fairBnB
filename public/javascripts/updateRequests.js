'use strict';
$(document).ready(function () {
  $("[name='approve']").click(function(){
    console.log("button clicked");
    alert( "Handler for .click() called." );
  });
});

    //$.post({
    //  url: '/:userId/listings/:listingId/bookingRequests/:bookingRequestId',
    //  data: { approved: true, denied: false, status: "Booking Approved" },
    //  dataType: 'json',
    //  success: function(response) {
    //    console.log(response);
    //  },
    //  error: function(err) {
    //    console.log(err);
    //  }
    //});
