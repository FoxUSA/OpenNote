/**
 * Search
 */
openNote.controller("searchController", function(	$scope, 
													$rootScope, 
													searchService,
													config,
													$location) {
	/**
	 * Default valie
	 */
	$scope.searchRequest={
			type: "Both",
			field: "Both",
			search: ""
	};
	
	/**
	 * Send search request to backend
	 */
	$scope.search = function(){
		searchService.search($scope.searchRequest).then(function(data){
			$scope.currentFolder = data;
		});
	}
	
	/**
	 * Load a folder
	 * @param folder- the folder to load
	 */
	$scope.loadFolder = function(folder){
		$scope.fadeOutFolders(function(){
			$location.url("/folder/"+folder.id);
		});
	};
	
	/**
	 * Load a note
	 * @param note - load a note
	 */
	$scope.loadNote = function(note){
		$scope.fadeOutFolders(function(){
			$location.url("/note/"+note.id);
		});
	};
	
	/**
	 * fade out all folders
	 */
	$scope.fadeOutFolders = function(callback){
		if($scope.currentFolder.foldersInside !=null && $scope.currentFolder.foldersInside.length>0)
			$(".folder").fadeOut(config.fadeSpeedShort(),function(){
				$scope.$apply(function(){
					callback();
				});
			});
		else
			callback();
	};
});