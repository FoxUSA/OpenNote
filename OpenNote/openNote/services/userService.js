/**
 * Connects the the rest service to get user details 
 */
openNote.service("userService", function ($http, $q) {

	/**
	 *Local apiToken 
	 */
	this.apiToken = "";
	
	/**
	 *@return - the apiToken 
	 */
	this.getAPIToken = function(){
		return this.apiToken;
	};
	
	/**
	 * Checks is a user is available
	 * @param userName - the username to check 
	 * @return - true if available, false if not
	 */
	this.isAvailable = function(userName){ 	
		return $http.get(config.servicePath() +"/user/"+userName).then(null,function(response){
			switch(response.status){
	  			case 302://we found it so its not available
	  				return false;
	  				
	  			case 404://could not find it so its available
	  				return true; 
	  				
	  			default://there was a error
	  				throw "Error";
			};
		});
	};
	
	/**
	 * Logs the user in
	 * @param userName - the username to login with 
	 * @param password - the password to login with
	 * @return - true if successful, false if not
	 */
	this.login = function(userName, password){ 	
		return $http.post(config.servicePath() +"/token/"+userName+"&"+password).then(
		function(response){//Successful
			if(response.status==200){
				var temp = angular.fromJson(response.data);
				this.apiToken=temp.token;
				return true;	
			}
			
		},
		function(response){
			return false;
		});
	};
	
});