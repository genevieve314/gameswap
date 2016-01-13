angular
.module('messages.controller', [])
.controller('MessagesController', function(MainService, MessagesService) {
  this.recipient = MainService.getRecipient();
  this.author = /*currentUser*/
  this.sendMessage = function(message) {
    MessagesService.sendMessage(message)
    .then(function(data) {
      MessagesService.getMessages();
    }, function(error) {
      throw error;
    });
  };
  this.getMessages = function() {
    return MessagesService.getMessages();
  };
  this.messageHistory = this.getMessages();
});
