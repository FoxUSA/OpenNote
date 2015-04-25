/**
 * Search
 */
openNote.controller("legacyController", function(	$scope, 
													$rootScope, 
													storageService,
													userService,
													config,
													legacyImportService) {
	
	
	$scope.username = userService.getUsername();
	$scope.password = "";
	//FIXME service url
	
	/**
	 * Handle login
	 */
	$scope.login = function(){
		userService.login($scope.username, $scope.password).then(function(data){
			if(data)
				alertify.success("Credentials Accepted");		
			else
				alertify.error("Invalid credentials");
		});
	};
	
	/**
	 * Handle register
	 */
	$scope.register = function(){
		userService.register($scope.username, $scope.password).then(function(data){
			if(data)
				alertify.success("Credentials Accepted");		
			else
				alertify.error("Invalid credentials");
		});
	};
	
	/**
	 * Run legacy import
	 */
	$scope.import = function(){
		if(userService.hasValidToken()){
			legacyImportService.import();
			
			//Wait until we are done and let the world know
				$rootScope.$on("importComplete", function(event, args) {
			    	alertify.success("Import has completed");
			    	$rootScope.$emit("reloadListView", {});
			    });
		}
		else
			alertify.error("You must be logged in to run import");
	};
});