angular
  .module('messages.controller', [])
  .controller('MessagesController', function (MainService, MessagesService, ProfileServices) {
    this.to = MainService.getRecipient();
    this.sendMessage = function (messageText, to) {
      console.log('inside client send message');
      MessagesService.sendMessage({
            text: messageText,
            to: to
      })
      // .then(function(){
      //   this.getMessages();
      // }.bind(this));

    };

    this.getMessages = function () {
      MessagesService.getMessages()
      .then(function(data){
        console.log('data in MessagesController: ', data.results);
        this.messageHistory = data.results;
        console.log('history in MessagesController: ', this.messageHistory);
      }.bind(this));
    }

    this.getUser = function () {
      ProfileServices.getProfileData()
        .then(function (resp) {
          this.username = resp.username;
          console.log('user in message controller: ', this.username);
          console.log('this in message controller: ', this);
        }.bind(this));
    };
    this.getMessages();
    this.from = this.getUser();
});
