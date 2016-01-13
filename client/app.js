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
    'messages.service'])

  .config(function($stateProvider, $urlRouterProvider){

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
    .state('messages', {
      url: '/messages',
      templateUrl: './messages/messages.html',
      controller: 'MessagesController'
    });
});
