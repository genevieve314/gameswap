angular
  .module('main.service', [])
  .service('MainService', function($http) {
  this.searchOfferings = function(game){
    return $http.post('/searchofferings', game)
    .then(function(resp){
      console.log('response',resp);
      return resp.data;
    }.bind(this), function(error) {
      throw error;
    }.bind(this));
  };
  this.addRecipient = function(recipient) {
    this.recipient = recipient;
  };
  this.getRecipient = function() {
    return this.recipient;
  };
});
