angular
  .module('main.service', [])
  .service('MainService', function($http) {
  var searchGamesDb = function(){
    return $http({
      method: 'GET',
      url: '/games'
    })
    .success(function(resp){
      return resp.data;
    })
    .err(function(error) {
      throw error;
    });
  };
});
