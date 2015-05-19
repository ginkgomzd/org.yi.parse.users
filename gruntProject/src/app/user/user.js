angular.module( 'ngBoilerplate.user', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'user', {
    url: '/user',
    views: {
      "main": {
        controller: 'UserCtrl',
        templateUrl: 'user/user.tpl.html'
      }
    },
    data:{ pageTitle: 'User' }
  });
})

.controller( 'UserCtrl', function UserCtrl( $state, $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.user = Parse.User.current();
  if (!$scope.user) {
    $state.go("login");
  }

  $scope.logout = function() {
    Parse.User.logOut();
    $state.go("login");
  };
})

;
