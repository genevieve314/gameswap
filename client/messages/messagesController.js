angular
  .module('messages.controller', [])
  .controller('MessagesController', function(MainService, MessagesService) {
    this.to = MainService.getRecipient();
    this.sendMessage = function(messageText, to) {
      MessagesService.sendMessage({
          message: {
            text: messageText,
            to: to
          }
        })
        .then(function(data) {
          this.from = data.userfrom;
          MessagesService.getMessages();
        }.bind(this), function(error) {
          throw error;
        }.bind(this));
    };
    this.getMessages = function() {
      return MessagesService.getMessages();
    };
    this.messageHistory = this.getMessages();
  });
