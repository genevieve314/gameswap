angular
.module('messages.service', [])
.service('MessagesService', function() {
  this.sendMessage = function(message){
    return $http.post('/addmessage', message)
    // TODO: check for token and send with message
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
