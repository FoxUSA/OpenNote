
openNote.controller("folderController", function($scope, $rootScope, $location, $routeParams,folderFactory, config) {
	$rootScope.buttons = [];
	$scope.folderEditMode = false;
	$scope.currentFolder = new folderFactory();
	
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
				alertify.prompt(	
					"Please enter a name for the new folder that will be created in "+$scope.currentFolder.name,
					function(confirm,data){
						if(!confirm)
							return;
						
						var folder = new folderFactory();
						folder.name=data;
						folder.parrentFolderID=$scope.currentFolder.id;
						folder.$save({levels: null}).then(function(data){
							$rootScope.$emit("reloadListView", {});
							$location.url("/folder/"+folder.id);
						});
					},
					"");
			}
		});
		
		$rootScope.buttons.push({
			text: "Find",
			action: function(){
				alert("TODO");
			}
		});
		
	/**	
	 * Load folder contents
	 */
	$scope.currentFolder.$get({id:$routeParams.id});
	
	/**
	 * Activate folder edit mode if we are not in the home folder
	 */
	$scope.activateFolderEditMode = function(){
		if($scope.currentFolder.id != null)
			$scope.folderEditMode = !$scope.folderEditMode;
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
	 * Rename the current folder
	 */
	$scope.renameFolder = function(){
		alertify.prompt("Rename "+$scope.currentFolder.name+" to:",
			function(confirm,data){
				if(!confirm)
					return;
			
				$scope.currentFolder.name=data;
				$scope.currentFolder.$update({levels: null}).then(function(data){
					$scope.currentFolder.$get({id: $scope.currentFolder.id});
					$rootScope.$emit("reloadListView", {});
				});
			},		
			$scope.currentFolder.name//show the current folder name
		);
	};
	
	/**
	 * Remove this folder and all sub items
	 */
	$scope.removeFolder = function(){
		alertify.confirm("Are you sure you want to delete "+$scope.currentFolder.name+" and all subfolders and notes it contains?",
			function(confirm) {
				if(!confirm)
					return;
					
				var parrentFolderID = $scope.currentFolder.parrentFolderID;
				$scope.currentFolder.$remove({levels: null, id: $scope.currentFolder.id}).then(function(data){
					$rootScope.$emit("reloadListView", {});
					
					if(parrentFolderID==null)
						$location.url("/folder/");
					else
						$location.url("/folder/"+parrentFolderID);
				});
			});
	}
	
	/**
	 * Listen to changed folder events to see if its the current open folder
	 */
	$rootScope.$on("changedFolder", function(event, request) {
	    if(request.folder.parrentFolderID==$scope.currentFolder.id || $scope.currentFolder.id==request.oldParrentFolderID){//does the change effect us?
	    	$scope.currentFolder.$get({id:$scope.currentFolder.id});//reload
	    }
    });
});