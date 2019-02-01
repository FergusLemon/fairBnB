'use strict';
$(document).ready(function () {
  $("[name='approve']").click(function(event){
    event.preventDefault();
    const bookingRequest = $(this).attr('data');
    const bookingRequestJSObject = JSON.parse(bookingRequest);
    const userId = bookingRequestJSObject.owner;
    const listingId = bookingRequestJSObject.listing;
    const requestId = bookingRequestJSObject._id;
    $.ajax({
      type: 'PUT',
      url: '/users/' + userId + '/listings/' + listingId + '/bookingRequests/' + requestId,
      data: {
        approved: true,
        declined: false
      },
      dataType: 'json'
      }).done(function(res, err) {
        if (res) {
          console.log("success");
        } else {
          console.log(err);
        }
      });
    alert( "Handler for .click() called." );
  });
});
