/**
 * Connects the the rest service to get user details 
 */
openNote.service("userService", function ($http, $q, config) {
	
	var test = "";
	/**
	 * @return - raw token object
	 */
	this.getAPITokenObject = function(){
		return angular.fromJson(sessionStorage.apiToken);
	};
	
	/**
	 * Is token vald?
	 * @return - true if token is still valid
	 */
	this.hasValidToken = function(){
		var tokenObject = this.getAPITokenObject();
		if(tokenObject!=null){
			var tokenTime = tokenObject.expires.replace(" ","T");//convert to ISO-8601 date and time
			return new Date().getTime()< Date.parse(tokenTime);
		}
	
		return false;
	};
	
	/**
	 * @return - the apiToken 
	 */
	this.getAPIToken = function(){
		var tokenObject = this.getAPITokenObject();
		if(tokenObject!=null)
			return tokenObject.token;
		return null;
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
				sessionStorage.apiToken=angular.toJson(response.data);
				return true;	
			}
			
		},
		function(response){
			return false;
		});
	};
	
});