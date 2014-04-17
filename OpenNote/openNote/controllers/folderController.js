/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("folderController", function($scope, userService, $location, $routeParams,folderFactory, config) {
	$scope.notes=[];
	$scope.folders=[];
	$scope.title="";

	/**
	 * Load folder contents
	 */
	var temp = new folderFactory();
	temp.$get({id:$routeParams.id}).then(function(folder){
		$scope.title  	=folder.name;
		$scope.folders = folder.foldersInside;
		$scope.notes=folder.notesInside;
	});
	
	/**
	 * fade out all folders
	 */
	$scope.fadeOutFolders = function(callback){
		$(".folder").fadeOut(config.fadeSpeedShort(),function(){
			$scope.$apply(function(){
				callback();
			});
		});
	};
	
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
});