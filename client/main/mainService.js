angular
  .module('main.service', [])
  .service('MainService', function($http) {
  var searchGamesDb = function(game){
    return $http({
      method: 'POST',
      url: '/games',
      data: game
    })
    .success(function(resp){
      return resp.data;
    })
    .err(function(error) {
      throw error;
    });
  };
});
