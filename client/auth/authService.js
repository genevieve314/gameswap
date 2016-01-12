angular.module('auth.service', [])  

.factory('AuthServices', function($http) {

	var submitNewUser = function(userData) {
		console.log('userData ', userData);
		return $http({
			method: 'POST',
			//url:    , // TBD 
			data: userData
		}).then(function(resp) {
			console.log('resp ', resp);
			return resp.data.token;   //  FIGURE OUT WHAT THIS TOKEN BUSINESS MEANS
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	};

	var checkSignin = function(userData){
		console.log('userData ', userData);
		return $http({
			method: 'POST',
			//url:    , // TBD 
			data: userData
		}).then(function(resp) {
			console.log('resp ', resp);
			return resp.data.token;   //  FIGURE OUT WHAT THIS TOKEN BUSINESS MEANS
		}, function(error) {
  			console.error('ERROR!!! ', error);
		})
	};

	return {
		submitNewUser: submitNewUser,
		checkSignin: checkSignin
	};

})