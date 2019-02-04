'use strict';

$((function () {
  $(".button").each(function() {
    let status = $(this).attr('Data'),
        statusObj = JSON.parse(status);
    if ( statusObj.status !== 'Pending' ) {
      $(this).prop('disabled', true);
    }
  });

  $("[name='approve']").click(function(event){
    const $button = $(this),
          bookingRequestData = $button.attr('data'),
          bookingRequest = JSON.parse(bookingRequestData);
    event.preventDefault();
    approveBookingRequest(bookingRequest);
  });
}));

function approveBookingRequest(bookingRequest) {
  const userId = bookingRequest.owner,
        listingId = bookingRequest.listing,
        requestId = bookingRequest._id;
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
        checkForOtherBookingRequests(bookingRequest);
      }
    },
    error: function(err) {
      console.log(err);
      $(this).prop('disabled', false);
    }
  });
}

function checkForOtherBookingRequests(bookingRequest) {
  const listingId = bookingRequest.listing;
  $.ajax({
    type: 'GET',
    url: '/listings/' + listingId + '/bookingRequests',
    data: {
      start: bookingRequest.requestStartDate,
      end: bookingRequest.requestEndDate
    },
    dataType: 'json',
    success: function(res) {
      if (res.success && res.bookingRequests.length) {
        let bookingRequests = res.bookingRequests;
        declineBookingRequests(bookingRequests);
      } else if (res.success) {
        location.reload();
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function declineBookingRequests(bookingRequests) {
  for ( let bookingRequest of bookingRequests ) {
    let bookingRequestId = bookingRequest._id;
    $.ajax({
      type: 'PUT',
      url: '/bookingRequests/' + bookingRequestId,
      data: {
        approved: false,
        declined: true,
        status: 'Declined'
      },
      dataType: 'json',
      success: function(res) {
        if(res.success) {
          location.reload();
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
}
