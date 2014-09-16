
openNote.controller("folderController", function(	$scope, 
													$rootScope, 
													$location, 
													$routeParams, 
													folderFactory, 
													config,
													$timeout) {
	$rootScope.buttons = [];
	$scope.folderEditMode = false;
	$scope.currentFolder = new folderFactory();
	
	//add buttons
		if($routeParams.id!=null)
			$rootScope.buttons.push({
				text: "New note",
				action: function(){
					$scope.fadeOutFoldersAndNotes(function(){
						$location.url("/note/").search("folderID",$scope.currentFolder.id);
					});
				},
				helpText: $rootScope.helpContent.newNoteButton
			});
		
		$rootScope.buttons.push({
			text: "New folder",
			action: function(){
				var prompt = "Please enter a name for the new folder";
				
				if($scope.currentFolder.name!=null)
					prompt += "that will be created in "+$scope.currentFolder.name;
				
				alertify.prompt(	
					prompt,
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
			},
			helpText: $rootScope.helpContent.newFolderButton
		});
		
		$rootScope.buttons.push({
			text: "Search",
			action: function(){
				$location.url("/search/"+$scope.currentFolder.id);
			},
			helpText: $rootScope.helpContent.findButton
		});
		
	/**	
	 * Load folder contents
	 */
	$timeout(function(){
		$scope.currentFolder.$get({id:$routeParams.id}).then(function(data){
			//Do they have anything to display?
				if($scope.currentFolder.id==null && $scope.currentFolder.foldersInside.length==0){
					$scope.currentFolder.name=null;//resets title
					alertify.alert("It looks like you dont have any folders. You can create one using the \"New Folder\" button in the top right of the page.");
				}
		});
	});
	
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
	$scope.fadeOutFoldersAndNotes = function(callback){
		if(		(	$scope.currentFolder.foldersInside !=null 
				&& 	$scope.currentFolder.foldersInside.length>0)
			||	(	$scope.currentFolder.notesInside !=null 
				&& 	$scope.currentFolder.notesInside.length>0)){
			
			$(".note").fadeTo(config.fadeSpeedShort(),0,function(){
				$scope.$apply(function(){
					callback();
				});
			});
			
			$(".folder").fadeTo(config.fadeSpeedShort(),0,function(){
				$scope.$apply(function(){
					callback();
				});
			});
		}
		else
			callback();
	};
	
	/**
	 * Load a folder
	 * @param folder- the folder to load
	 */
	$scope.loadFolder = function(folder){
		$scope.fadeOutFoldersAndNotes(function(){
			$location.url("/folder/"+folder.id);
		});
	};
	
	/**
	 * Load a note
	 * @param note - load a note
	 */
	$scope.loadNote = function(note){
		$scope.fadeOutFoldersAndNotes(function(){
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
				$scope.currentFolder.$remove({id: $scope.currentFolder.id}).then(function(data){
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