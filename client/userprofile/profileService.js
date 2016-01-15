angular.module('profile.service', [])  

.factory('ProfileServices', function($http, $window){

	var getProfileData = function(){
		var token = $window.localStorage.getItem('com.gameswap');

		console.log("token in getProfileData ", token);

		return $http({
			method: 'POST',
			url: '/profile',
			data: {token: token}
		})
		.then(function(resp){
			console.log("resp in getProfileData ", resp);
			return resp.data;
		}, function(error) {
  			console.error('ERROR in getProfileData: ', error);
		})
	};

	var addGameOffering = function(game){
		var token = $window.localStorage.getItem('com.gameswap');

		console.log('game var passed in to addGameOffering service: ', game);

		return $http({
			method: 'POST',
			url: '/addtoofferings',	
			data: {game: game, token: token}      			
		})
		.then(function(resp){
			return resp;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})

	};

	var addGameSeeking = function(game){
		var token = $window.localStorage.getItem('com.gameswap');

		console.log('game var passed in to addGameSeeking service: ', game);

		return $http({
			method: 'POST',
		    url: '/addtoseeking',
			data: {game: game, token: token}      			
		})
		.then(function(resp){
			return resp;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	};

	var updateProfile = function(data){
		var update = {
			phone: data.phone || "",
			street: data.street || "",
			city: data.city || "",
			state: data.state || "",
			zip: data.zip || "",
			geoloc: data.geoloc || "",
			profilepic: data.profilepic || ""
		};
		console.log("update object in updateProfile ", update);

		var token = $window.localStorage.getItem('com.gameswap');

		return $http({
			method: 'PUT',
		    url: '/profile/update',
			data: {user: update, 
				token: token}      			
		})
		.then(function(resp){
			return resp;
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	}

	/*       
	var getOfferingList = function($http){
		var token = $window.localStorage.getItem('com.gameswap');
		return $http({
			method: 'POST',
			url: null   // ASK ERIC ABOUT DB ENDPOINTS FOR GETTING OFFERING AND SEEKING LIBRARIES
			data: {token: token}
		})
		.then(function(resp){
			return resp.data;
		}, function(error) {
  			console.error('ERROR in getOfferingList: ', error);
		})
	};*/
/*
	var getSeekingList = function($http){
		var token = $window.localStorage.getItem('com.gameswap');

		return $http({
			method: 'POST',
			// url: ''  // ASK ERIC ABOUT ENDPOINTS FOR GETTING OFFERING AND SEEKING LIBRARIES
			data: {token: token}
		})
		.then(function(resp){
			return resp.data;
		}, function(error) {
  			console.error('ERROR in getSeekingList: ', error);
		})
	};*/

	return {
		getProfileData: getProfileData,
		//getOfferingList: getOfferingList,
		//getSeekingList: getSeekingList,
		addGameOffering: addGameOffering,
		addGameSeeking: addGameSeeking,
		updateProfile: updateProfile
	};


})