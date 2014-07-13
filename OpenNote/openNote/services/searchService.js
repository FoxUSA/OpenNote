/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Search service
 */
openNote.service("searchService", function ($http, config) {	
	
	/**
	 * Search
	 */
	this.search = function(searchRequest){
		return $http.post(config.servicePath() +"/search/", searchRequest).then(
			function(response){//Successful
				if(response.status==200)
					return response.data;	
				return null;
			},
			function(response){
				return null;
			});
	};
	
});