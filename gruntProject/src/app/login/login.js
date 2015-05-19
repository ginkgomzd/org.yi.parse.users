angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', function LoginCtrl( $state, $scope, $cordovaFacebook ) {
  // This is simple a demo for UI Boostrap.
  $scope.authenticate = function(user) {
    Parse.User.logIn(user.email, user.password, {
      success: function(user) {
        // Do stuff after successful login.
        $state.go("user");
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
  $scope.authenticate_fb = function() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      $scope.authenticate_fb_cordova();
    } 
    else {
      $scope.authenticate_fb_web();
    }
  };
  $scope.authenticate_fb_web = function() {
    
    Parse.FacebookUtils.logIn("email", {
      success: function(user) {
        $scope.saveFbEmail();
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  };
  $scope.authenticate_fb_cordova = function() {
    // facebookConnectPlugin.login(['public_profile','email'])
    $cordovaFacebook.login(['public_profile','email'])
    .then(function(success) {
      if (success.status=='connected') {
        expiration_date = (new Date(Date.now()+success.authResponse.expiresIn*1000)).toISOString();
        var facebookAuthData = {
            "id": success.authResponse.userID+"",
            "access_token": success.authResponse.accessToken,
            "expiration_date": expiration_date
        };
        Parse.FacebookUtils.logIn(facebookAuthData, {
          success: function(user) {
            getControllerScope().saveFbEmail();
          },
          error: function(user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
          }
        });
      }
      else {
        alert("FB Returned status not connected");
      }
    }, function(error) {
      alert('error');
        console.dir(error);
    });
  };
  $scope.saveFbEmail = function() {
    $cordovaFacebook.api("me", ["email"])
      .then(function(success) {
        user = Parse.User.current();
        user.set("email", success.email);
        user.save();
        $state.go("user");
      }, function (error) {
        // error
    });
  };
  $scope.register = function(userNew) {
    var user = new Parse.User();
    user.set("username", userNew.email);
    user.set("password", userNew.password);
    user.set("email", userNew.email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        $state.go("user");
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
})

;
