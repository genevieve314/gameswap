angular.module('profile.service', [])  

.factory('ProfileServices', function($http){

	var getProfileData = function(){
		return $http({
			method: 'GET',
			url: '/profile'
		})
		.then(function(resp){
			return resp.data;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	};

	var addGameOffering = function(game){
		return $http({
			method: 'POST',
			url: '/addtoofferings',
			data: game
		})
		.then(function(resp){
			return resp;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})

	};

	var addGameSeeking = function(game){
		return $http({
			method: 'POST',
		    url: '/addtoseeking',
			data: game
		})
		.then(function(resp){
			return resp;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	};

	return {
		getProfileData: getProfileData,
		addGameOffering: addGameOffering,
		addGameSeeking: addGameSeeking
	};


})