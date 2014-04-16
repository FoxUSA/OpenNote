/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("folderController", function($scope, userService, $location, $routeParams,folderFactory, config) {
	$scope.notes=[];
	$scope.folders=[];
	$scope.title="";
	
	$("#menu").fadeIn(config.fadeSpeedLong());
	$("#sideBar").fadeIn(config.fadeSpeedLong());

	
	var temp = new folderFactory();
	temp.$get().then(function(folder){
		$scope.title  	=folder.name;
		$scope.folders = folder.foldersInside;
	});
	
	/**
	 * Load a folder
	 * @param folder- the folder to load
	 */
	$scope.loadFolder = function(folder){
		$(".folder").fadeOut(config.fadeSpeedShort(),function(){
			$scope.$apply(function(){
				//$location.hash(folder.id);
				$scope.title=folder.name;
				$scope.folders=folder.foldersInside;
				$scope.notes=folder.notesInside;
			});
		});
	}
	
	/**
	 * Load a note
	 * @param note - load a note
	 */
	$scope.loadNote = function(note){
		
	}
});