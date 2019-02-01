'use strict';
$(document).ready(function () {
  $("[name='approve']").click(function(event){
    const $button = $(this),
          bookingRequest = $button.attr('data'),
          bookingRequestJSObject = JSON.parse(bookingRequest),
          userId = bookingRequestJSObject.owner,
          listingId = bookingRequestJSObject.listing,
          requestId = bookingRequestJSObject._id;
    event.preventDefault();
    $.ajax({
      type: 'PUT',
      url: '/users/' + userId + '/listings/' + listingId + '/bookingRequests/' + requestId,
      data: {
        approved: true,
        declined: false,
        status: 'Approved'
      },
      dataType: 'json',
      success: function(res) {
        if(res.success) {
          location.reload();
        }
      },
      error: function(err) {
        console.log(err);
        button.prop('disabled', false);
      }
    });
  });
});
