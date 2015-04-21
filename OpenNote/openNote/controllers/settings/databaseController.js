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
	
	/**
	 * Save replication settings
	 */
	$scope.save = function(){
		storageService.setRemoteURL($scope.url);
		$rootScope.$on("replicationComplete", function(event, args) {
			$rootScope.$emit("reloadListView", {});
	    });
		storageService.setupSync();
	};
});