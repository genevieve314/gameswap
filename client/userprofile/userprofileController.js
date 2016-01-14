angular.module('userprofile', [])
  .controller('ProfileController', function(AuthServices, ProfileServices){
  	
    var userInfo = this;

    this.gamesOffered = [];
    this.gamesSeeking = [];

    this.getOffering = function(){
      this.gamesOffered = [];
      var tempArray = ProfileServices.getProfileData().offerings; // might need to promisify
      for(var i = 0; i < tempArray.length; i++) {                    
        this.gamesOffered.push({
          title: game.title,
          platform: game.platform,
          condition: game.condition || 'terrible'   
        });
      };
    };

    this.getSeeking = function(){
      this.gamesSeeking = [];
      var tempArray = ProfileServices.getProfileData().seeking;   // might need to promisify
      for(var i = 0; i < tempArray.length; i++) {                    
        this.gamesSeeking.push({
          title: game.title,
          platform: game.platform
        });
      };
    };

    var loadProfile = function() {
      
      ProfileServices.getProfileData()
        .then(function(resp) {
          console.log("resp in ProfileServices.getProfileData() ", resp);
          userInfo.username = resp.username;
          console.log('this.username ', userInfo.username);
          userInfo.email = resp.email;  

          if(resp.address) {
            userInfo.hasAddress = true;
            userInfo.address = resp.address;
          } else {
            userInfo.hasAddress = false;
          }

          userInfo.gamesOffered = resp.offerings;
          userInfo.gamesSeeking = resp.seeking;

        //  this.getOffering();
        //  this.getSeeking();

        });
    };

    //  WILL NEED TO ADD FUNCTION(S) FOR ADDING AN ADDRESS

    this.submitAddress = function(address) {  	
      console.log("address obj: ", address);

      loadProfile();
    };

  	this.addOffer = function(game) {
      ProfileServices.addGameOffering({
  			  title: game.title,
  			  platform: game.platform,   //  add DOM field for this
          condition: game.condition //  add DOM field for this	
  			}).then(function(resp){
          console.log('resp in this.addOffer promise: ', resp);
          console.log('calling this.loadProfile in this.addOffer promise: ', resp);

          loadProfile(); // re-render the seeking library

        });
  	};

  	this.addSeek = function(game) {
      ProfileServices.addGameSeeking({
          title: game.title,
          platform: game.platform //  add DOM field for this  
        }).then(function(resp){
          console.log('resp in this.addSeek promise: ', resp);
          console.log('calling this.loadProfile in this.addSeek promise: ');
          loadProfile(); 
        });
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    loadProfile();

  })
