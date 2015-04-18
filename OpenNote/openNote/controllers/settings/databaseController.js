/**
 * Search
 */
openNote.controller("databaseController", function(	$scope, 
													$rootScope, 
													storageService,
													config,
													$location) {
	$scope.downloadFile = null;
	
	/**
	 * Generate a backup
	 */
	$scope.generateBackup = function(){
		storageService.databaseToFile(function(data){
			$scope.downloadFile=data;
		});
	};
});