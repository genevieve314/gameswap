angular.module('userprofile', [])
  .controller('ProfileController', function(){
  	//ProfileServices, MainService
  	// will need to issue a GET request of some kind wherein we grab the user info
  //	var user = ProfileServices.getProfileData(); // assuming this will be an object 

  /*	this.username = user.username;
  	this.email = user.email;  */
  	this.gamesOffered = [{title: "galaga", platform: "PS4"}, {title: "tempest", platform: "Xbox"}];  // user.gamesOffered
  	this.gamesSeeking = [{title: "dig-dug", platform: "Xbox"}, {title: "pacman", platform: "PS4"}];  // user.gamesSeeking

  	this.addOffer = function(game) {
  		this.gamesOffered.push(
  			{ title: game,
  			  platform: 'PS4' //  add DOM field for this	
  			})

  		console.log(this.gamesOffered);

  		// need to call function to re-render offer and seek lists???

  	};

  	this.addSeek = function(game) {
  		this.gamesSeeking.push(
  			{ title: game,
  			  platform: 'PS4' //  add DOM field for this	
  			})

  		console.log(this.gamesSeeking);

  		// need to call function to re-render offer and seek lists???

  	};



  })
