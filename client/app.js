angular
  .module('app', [
  	'main.controller',
  	'main.service',
  	'results.controller',
  	'results.service',
  	'userprofile',
  	'profile.service',
  	'auth.signin',
  	'auth.signup',
  	'auth.service',
  	'ui.router',
    'messages.controller',
    'messages.service',
    'index.controller'])

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
		.state('userprofile', {
			url: '/userprofile',
			templateUrl: './userprofile/userprofile.html',
			controller: 'ProfileController'
		})
    .state('messages', {
      url: '/messages',
      templateUrl: './messages/messages.html',
      controller: 'MessagesController'
    });

	$httpProvider.interceptors.push('AttachTokens');

})
  .factory('AttachTokens', function ($window) {
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
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !AuthServices.isAuth()) {
      $location.path('/signin');
    }
  });
});
