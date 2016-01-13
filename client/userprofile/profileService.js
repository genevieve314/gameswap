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

	// ASK ERIC ABOUT ENDPOINTS FOR GETTING OFFERING AND SEEKING LIBRARIES

	var getOfferingList = function($http){
		return $http({
			method: 'GET',
			//url: ''   // ASK ERIC ABOUT DB ENDPOINTS FOR GETTING OFFERING AND SEEKING LIBRARIES
		})
		.then(function(resp){
			return resp.data;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	};

	var getSeekingList = function($http){
		return $http({
			method: 'GET',
			// url: ''  // ASK ERIC ABOUT ENDPOINTS FOR GETTING OFFERING AND SEEKING LIBRARIES
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
		getOfferingList: getOfferingList,
		getSeekingList: getSeekingList,
		addGameOffering: addGameOffering,
		addGameSeeking: addGameSeeking
	};


})