/**
 * Search
 */
openNote.controller("databaseController", function(	$scope, 
													$rootScope, 
													storageService,
													config,
													$location) {
	$scope.downloadFile = null;
	$scope.url = storageService.getRemoteURL();
	
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
	
	/**
	 * Delete the database
	 */
	$scope.deleteDatabase = function(){//FIXME TODO
		alertify.confirm("Are you sure you want to delete "+$scope.currentFolder.name+" and all subfolders and notes it contains?",
			function(confirm) {
				if(!confirm)
					return;
					
				var parrentFolderID = $scope.currentFolder.parrentFolderID;
				storageService.database().remove($scope.currentFolder).then(function(result){
					$rootScope.$emit("reloadListView", {});
					
					if(!parrentFolderID)
						$location.url("/folder/");
					else
						$location.url("/folder/"+parrentFolderID);
					
					$scope.$apply();
				});
		});
	};
	
	/**
	 * Handle cleaning orphaned docs
	 */
	$scope.cleanOrphans = function(){
		storageService.cleanOrphans();
		alertify.log("Finding and removing orphans");
	};
});