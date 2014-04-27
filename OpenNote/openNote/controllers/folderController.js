
openNote.controller("folderController", function($scope, $rootScope, $location, $routeParams,folderFactory, config) {
	$scope.currentFolder = null;
	$rootScope.buttons = [];
	$scope.folderEditMode = false;
	
	//add buttons
		if($routeParams.id!=null)
			$rootScope.buttons.push({
				text: "New Note",
				action: function(){
					$scope.fadeOutFolders(function(){
						$location.url("/note/").search("folderID",$scope.currentFolder.id);
					});
				}
			});
		
		$rootScope.buttons.push({
			text: "New Folder",
			action: function(){
				alert("Kendra");
			}
		});
		
		$rootScope.buttons.push({
			text: "Find",
			action: function(){
				alert("I love you.");
			}
		});
		
	/**
	 * Load folder contents
	 */
	var temp = new folderFactory();
	temp.$get({id:$routeParams.id}).then(function(folder){
		$scope.currentFolder = folder;
	});
	
	/**
	 * Activate folder edit mode if we are not in the home folder
	 */
	$scope.activateFolderEditMode = function(){
		if($scope.currentFolder.id != null)
			$scope.folderEditMode = true;
	};
	
	/**
	 * fade out all folders
	 */
	$scope.fadeOutFolders = function(callback){
		if($scope.currentFolder.foldersInside.length>0)
			$(".folder").fadeOut(config.fadeSpeedShort(),function(){
				$scope.$apply(function(){
					callback();
				});
			});
		else
			callback();
	};
	
	/**
	 * Load a folder
	 * @param folder- the folder to load
	 */
	$scope.loadFolder = function(folder){
		//$scope.fadeOutFolders(function(){
			$location.url("/folder/"+folder.id);
		//});
	};
	
	/**
	 * Load a note
	 * @param note - load a note
	 */
	$scope.loadNote = function(note){
		//$scope.fadeOutFolders(function(){
			$location.url("/note/"+note.id);
		//});
	};
});