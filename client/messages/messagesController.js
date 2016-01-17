angular
  .module('messages.controller', [])
  .controller('MessagesController', function (MainService, MessagesService, ProfileServices) {
    this.toId = MainService.getRecipientId();
    this.toName = MainService.getRecipientName();
    // console.log('this.to',this.to);
    this.sendMessage = function (messageText, to) {
        // messageText = null;
        console.log('message text: ', this, messageText);

      MessagesService.sendMessage({
            text: messageText,
            to: to
      })
      .then(function(){
        this.getMessages();
      }.bind(this));

    };

    this.getMessages = function () {
      MessagesService.getMessages()
      .then(function(data){
        this.messageHistory = null;
        this.messageHistory = data.results;
        // console.log('data in getMessages client: ', this.messageHistory);
      }.bind(this));
    };

    this.getUser = function () {
      ProfileServices.getProfileData()
        .then(function (resp) {
          this.username = resp.username;
          this.toId = resp.id;  
        }.bind(this));
    };

    this.reply = function (userid, username) {
      this.toid = userid;
      this.toName = username;
    };

    this.getMessages();
    this.from = this.getUser();
});
