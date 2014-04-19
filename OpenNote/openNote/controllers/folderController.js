/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("folderController", function($scope, $rootScope, userService, $location, $routeParams,folderFactory, config) {
	$scope.currentFolder=null;
	$rootScope.buttons=[];
	
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