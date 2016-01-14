angular.module('userprofile', [])
  .controller('ProfileController', function(AuthServices, ProfileServices){
  	
    var userInfo = this;

    this.gamesOffered = [];
    this.gamesSeeking = [];

    this.getOffering = function(){
      this.gamesOffered = [];
      var tempArray = ProfileServices.getProfileData().offerings;
      for(var i = 0; i < tempArray.length; i++) {                       //   Unless it's an array 
        this.gamesOffered.push({
          title: game.title,
          platform: game.platform,
          condition: game.condition || 'terrible'      // if game.condition is undefined, set to 'good'
        });
      };
    };

    this.getSeeking = function(){
      this.gamesSeeking = [];
      var tempArray = ProfileServices.getProfileData().seeking;
      for(var i = 0; i < tempArray.length; i++) {                       //   Unless it's an array 
        this.gamesSeeking.push({
          title: game.title,
          platform: game.platform
        });
      };
    };

    var loadProfile = function() {
     // var user = {};  // temporary till the backend is finished
    //  user = ProfileServices.getProfileData();
    /*    .then(function(resp) {
          console.log("resp in ProfileServices.getProfileData() ", resp);
          return resp;
        }); */

      // OR try...
      
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

      this.loadProfile();
    };


    //this.address = user.address || "Click the 'add address' button to add your address:";
  //	this.gamesOffered = [{title: "sonic", platform: "PS4", condition: "good"}, {title: "mario bros", platform: "Xbox", condition: "like new"}, {title: "donkey kong", platform: "Xbox"}];  // user.gamesOffered
  //	this.gamesSeeking = [{title: "dig-dug", platform: "Xbox"}, {title: "pacman", platform: "PS4"}];  // user.gamesSeeking

    

  	this.addOffer = function(game) {
      ProfileServices.addGameOffering({
  			  title: game,
  			  platform: 'PS4' //  add DOM field for this	
  			}).then(function(resp){
          console.log('calling this.loadProfile in this.addOffer promise: ', resp);
          loadProfile(); 
        });

  		// need to call function to re-render offer and seek lists???
  	};

  	this.addSeek = function(game) {
      ProfileServices.addGameSeeking({
  			  title: game,
  			  platform: 'PS4'
  			});

      this.loadProfile();    // re-render the seeking library
  	};

  	this.signOut = function(){
  		AuthServices.signOut();
  	}

    loadProfile();

  })
