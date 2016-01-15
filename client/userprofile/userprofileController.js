angular.module('userprofile', [])
  .controller('ProfileController', function(AuthServices, ProfileServices){
  	
    var userInfo = this;

    this.gamesOffered = [];
    this.gamesSeeking = [];
    this.updateClicked = false;

    var loadProfile = function() {    
      ProfileServices.getProfileData()
        .then(function(resp) {
          userInfo.username = resp.username;
          userInfo.email = resp.email; 
          userInfo.city = resp.city;  

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

    this.toggleUpdate = function(){
      this.updateClicked = true;
    }

    this.submitUpdate = function(update) {  	
      console.log("update obj: ", update);
      ProfileServices.updateProfile(update)
        .then(function(resp){
          console.log("resp in submitUpdate: ", resp);

          setTimeout(loadProfile, 1000);// re-render the profile

        })
    };

  	this.addOffer = function(game) {
      ProfileServices.addGameOffering({
  			  title: game.title,
  			  platform: game.platform,   
          condition: game.condition 	
  			}).then(function(resp){
          console.log('resp in this.addOffer promise: ', resp);

          setTimeout(loadProfile, 1000);// re-render the library

        });
  	};

  	this.addSeek = function(game) {
      ProfileServices.addGameSeeking({
          title: game.title,
          platform: game.platform //  
        }).then(function(resp){
          console.log('resp in this.addSeek promise: ', resp);

          setTimeout(loadProfile, 1000); // re-render the library
        });
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    loadProfile();

    /* getOffering and getSeeking are handled by loadProfile for now...    

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

    */

  })
