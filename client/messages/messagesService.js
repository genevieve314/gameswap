angular
.module('messages.service', [])
.service('MessagesService', function() {
  this.sendMessage = function(message){
    var token = $window.localStorage.getItem('com.gameswap');
    return $http.post('/addmessage', message, {token: token})
    .then(function(resp){
      return resp.data;
    }.bind(this), function(error) {
      throw error;
    }.bind(this));
  };
  this.getMessages = function() {
    return $http.get('/getmessages')
    .then(function(resp) {
      return resp.data;
    }.bind(this), function(error) {
      throw error;
    }.bind(this));
  };
});
