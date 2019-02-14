'use strict';

$((function () {
  $(".button").each(function() {
    let bookingRequestData = $(this).attr('data'),
        bookingRequest = JSON.parse(bookingRequestData);
    if ( bookingRequest.status !== 'Pending' ) {
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

  $("[name='decline']").click(function(event){
    const $button = $(this),
          bookingRequestData = $button.attr('data'),
          bookingRequest = JSON.parse(bookingRequestData);
    event.preventDefault();
    declineBookingRequests([bookingRequest]);
  });
}));

function approveBookingRequest(bookingRequest) {
  let path = window.location.pathname;
  let regex = /(?=)\/users\/(\w+)(?<=)\/listings\//;
  const userId = path.match(regex)[1],
        listingId = bookingRequest.name,
        requestId = bookingRequest.info;
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
      console.log(res);
      if(res.success) {
        addDatesToListing(res.bookingRequest);
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
    let bookingRequestId = bookingRequest._id || bookingRequest.info;
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

function addDatesToListing(bookingRequest) {
  let listingId = bookingRequest.listing;
  $.ajax({
    type: 'PUT',
    url: '/listings/' + listingId,
    data: {
      start: bookingRequest.requestStartDate,
      end: bookingRequest.requestEndDate
    },
    dataType: 'json',
    success: function(res) {
      if(res.success) {
        checkForOtherBookingRequests(bookingRequest);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}
