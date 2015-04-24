/**
 * Search
 */
openNote.controller("databaseController", function(	$scope, 
													$rootScope, 
													storageService,
													userService,
													config,
													$location,
													Upload) {
	$scope.downloadFile = null;
	$scope.url = storageService.getRemoteURL();
	
	/**
	 * Generate a backup
	 */
	$scope.generateBackup = function(){
		storageService.exportToFile(function(data){
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
	$scope.deleteDatabase = function(){
		alertify.confirm("Are you sure you want to delete the database?",
			function(confirm) {
				if(!confirm)
					return;
					
				storageService.destroyDatabase(function(){
					userService.destroyTokenHeader();
					$rootScope.$emit("reloadListView", {});
					window.location.href='#/';
					$rootScope.$apply();
					alertify.success("Database deleted");
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
	
	/**
	 * Watch for file change
	 */
	$scope.upload = function(file){
		if(!file || !file.length)
			return;
		
		var file = file[0];
        var fileReader = new FileReader();
		
		alertify.confirm("Are you sure you want import the backup? If there are any conflicts, they will be ignored. You might want to take a backup first.",
			function(confirm) {
				if(!confirm)
					return;

		        fileReader.addEventListener("load", function(event) {
		            storageService.importFile(JSON.parse(event.target.result));
		        });
		        
		        fileReader.readAsText(file);
		});
    };
});