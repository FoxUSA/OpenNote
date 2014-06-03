/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Server configuration service
 */
openNote.service("serverConfigService", function ($http, $q, config) {
	/**
	 * @return - config object
	 */
	this.getConfig = function(){
		if(sessionStorage.serverConfig==null)//if we do not have it yet, request it
			return requestServerConfig();
		
		var deferred = $q.defer();
		deferred.resolve(angular.fromJson(sessionStorage.serverConfig));
		return deferred.promise;
	};
	
	/**
	 * Get server config list from server
	 */
	var requestServerConfig = function(){ 	
		return $http.get(config.servicePath() +"/config/").then(
		function(response){//Successful
			if(response.status==200)
				sessionStorage.serverConfig=angular.toJson(response.data);
				return response.data;	
		},
		function(response){//non 200 response
			return false;
		});
	};
});