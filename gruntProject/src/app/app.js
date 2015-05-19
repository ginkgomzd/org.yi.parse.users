/**
 * Init Angular
 *
 */
angular.module( 'ngBoilerplate', [
  'ngCordova',
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ngBoilerplate.login',
  'ngBoilerplate.user',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;


/**
 * Helper function if deep in a promise and can't get $scope anymore
 *
 */
function getControllerScope() {
  return angular.element(document.querySelector('body')).scope().$$childHead;
}


/**
 * Init Parse
 *
 */
Parse.initialize("7sN4gtvKPqW6cuExvH3Z993yzZkXspDvpZAAHCRH", "xo1xKZH8MM6jCHejmtuXrQpWG0TLajrh4bGniZaM");


/**
 * Init Facebook
 *
 */
 function initParseFb() {
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '1589016241365983', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.3' // point to the latest Facebook Graph API version
    });

    // Run code after the Facebook SDK is loaded.
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}



if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener('deviceready', onDeviceReady, false);
}
else {
  window.addEventListener('load', onDeviceReady, false);
  initParseFb();
}

function onDeviceReady() {
  var parentElement = document.getElementById('deviceready');
  var listeningElement = parentElement.querySelector('.listening');
  var receivedElement = parentElement.querySelector('.received');
  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');
}




