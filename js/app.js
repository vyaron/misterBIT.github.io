'use strict';

function cl(mix) {
  console.log(mix);
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    $('#btnFBLogin').hide();
    $('#btnLogout').show();
    $('#imgUser').attr('src', 'http://graph.facebook.com/' + response.authResponse.userID + '/picture');


    //testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}


function fbShare() {
  FB.ui({
    method: 'share',
    href: 'http://coding-academy.org'
  }, function(response){
    console.log('res:', response);
  });
}

function fbMsg() {
  FB.ui({
    method: 'send',
    link: 'http://coding-academy.org'
  });
}

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log(response);
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
  });
}

function fbLogout() {
  FB.logout(function(response) {
    // user is now logged out
    $('#btnFBLogin').show();
    $('#btnLogout').hide();

    console.log('User loged out');
    //FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    //});

  });
}

function fbFriends() {
  FB.api(
      "/me/friends",
      function (response) {
        console.log(response);
        if (response && !response.error) {
          var friendsHTML = response.data.map(function (friend) {
            return '<li>' + friend.name +
                    '<img src="http://graph.facebook.com/' + friend.id + '/picture" />'
                '</li>'
          });
          $('#listFriends').html(friendsHTML.join(''));
        }
      }
  );
}