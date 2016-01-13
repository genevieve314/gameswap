angular
  .module('app', [

 //	'signin',
 // 'signup',
  	'main.controller',
  	'main.service',
  	'results.controller',
  	'results.service',
  	'userprofile',
  	'profile.service',
  	'auth.signin',
  	'auth.signup',
  	'auth.service',
  	'ui.router'])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: './main/main.html',
			controller: 'MainController'
		})
		.state('signin', {
			url: '/signin',
			templateUrl: './auth/signin/signin.html',
			controller: 'SigninController'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: './auth/signup/signup.html',
			controller: 'SignupController'
		})
		.state('results', {		// this is where we will provide the search results when users search for games
			url: '/results',
			templateUrl: './results/results.html',
			controller: 'ResultsController'
		})
		.state('userprofile', {
			url: '/userprofile',
			templateUrl: './userprofile/userprofile.html',
			controller: 'ProfileController'
		})

	$httpProvider.interceptors.push('AttachTokens');

})
  .factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.gameswap');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, AuthServices) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !AuthServices.isAuth()) {
      $location.path('/signin');
    }
  });
});
