'use strict';
$(document).ready(function () {
  $(".button").each(function() {
    let status = $(this).attr('Data'),
        statusObj = JSON.parse(status);
    if ( statusObj.status !== 'Pending approval.' ) {
      $(this).prop('disabled', true);
    }
  });

  $("[name='approve']").click(function(event){
    const $button = $(this),
          bookingRequestData = $button.attr('data'),
          bookingRequest = JSON.parse(bookingRequestData);
    event.preventDefault();
    approveBookingRequest(bookingRequest);
    checkForOtherBookingRequests(bookingRequest);
  });

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
          location.reload();
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
        if(res.success && res.bookingRequests) {
          declineBookingRequests(res.bookingRequests);
          location.reload();
        } else {
          location.reload();
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  function declineBookingRequests(bookingRequests) {
    const listingId = bookingRequest.listing;
    $.ajax({
      type: 'PUT',
      url: '/listings/' + listingId + '/bookingRequests',
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
});
