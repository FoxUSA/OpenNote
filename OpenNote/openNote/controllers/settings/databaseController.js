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
		storageService.setupSync();
		/*if(!results.rows.length){//If the database is empty we will pull from the remote
			storageService.setRemoteURL($scope.url);
			storageService.setupSync();
			var temp = storageService.database().replicate.from(storageService.remoteDatabase()).on("complete", function () {
				alertify.success("Replication complete");
				temp.cancel();
				storageService.setupSync();
			}).on("error", function (err) {
				alertify.error("Replication error");
				temp.cancel();
			});
		}*/
	};
});