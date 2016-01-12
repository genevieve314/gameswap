angular
  .module('app', [
  	
 //	'signin', 
 // 'signup',  
  	'main.controller', 
  	'main.service', 
  	'results.controller', 
  	'results.service', 
  	'userprofile',
  	'auth.signin',
  	'auth.signup',
  	'auth.service',
  	'ui.router'])

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
})
