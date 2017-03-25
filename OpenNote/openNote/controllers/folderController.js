
openNote.controller("folderController", function(	$scope,
													$rootScope,
													$location,
													$routeParams,
													storageService,
													config,
													$timeout) {
	$rootScope.buttons = [];
	$scope.folderEditMode = false;
	$scope.currentFolder = {};
	$scope.parentFolder = null;
	$scope.currentFolderContents = [];

	//add buttons
		if($routeParams.id)
			$rootScope.buttons.push({
				text: "New note",
				action: function(){
					$scope.fadeOutFoldersAndNotes(function(){
						$location.url("/note/").search("folderID",$scope.currentFolder._id);
					});
				},
				helpText: $rootScope.helpContent.newNoteButton
			});

		//Create a folder
			$rootScope.buttons.push({
				text: "New folder",
				action: function(){
					var prompt = "Please enter a name for the new folder";

					if($scope.currentFolder.name)
						prompt += "that will be created in "+$scope.currentFolder.name;

					alertify.prompt(
						prompt,
						function(confirm,data){
							if(!confirm)
								return;

							var folder = {
									parentFolderID:$scope.currentFolder._id,
									name:data
							};

							createFolder(folder);
						},
						"");
				},
				helpText: $rootScope.helpContent.newFolderButton
			});

		if($routeParams.id)
			$rootScope.buttons.push({
				text: "Cut",
				action: function(){
					$rootScope.clipboard=$scope.currentFolder;
					alertify.success("Folder copied to clipboard");
				}
			});

		if($rootScope.clipboard && $rootScope.clipboard!=$scope.currentFolder)
			$rootScope.buttons.push({
				text: "Paste",
				action: function(){
					$rootScope.$emit("moveKey", {//fire off an event to tell everyone we just modified a folder
						destFolder: $scope.currentFolder,
						moveObject: $rootScope.clipboard
					});
					$rootScope.clipboard=null;
				}
			});

		$rootScope.buttons.push({
			text: "Search",
			action: function(){
				$location.url("/search/"+$scope.currentFolder.id);
			},
			helpText: $rootScope.helpContent.findButton
		});

	/**
	 * Load current folder contents
	 */
	$scope.loadCurrentFolder = function(){
		//Load the folder
		if(!$routeParams.id){
			$scope.currentFolder={//FIXME config special root
					_id:null,
					name:"Home"};
			loadCurrentFolderContents();
		}
		else{
			storageService.database().get($routeParams.id).then(function(doc){
				$scope.currentFolder=doc;
				loadCurrentFolderContents();

				if(!$scope.currentFolder.parentFolderID)
					$scope.parentFolder={name:"Home"};
				else
					storageService.database().get($scope.currentFolder.parentFolderID).then(function(doc){
						$scope.parentFolder=doc;
						$scope.$apply();
					});
			});
		}
	};

	/**
	 * Activate folder edit mode if we are not in the home folder
	 */
	$scope.activateFolderEditMode = function(){
		if($scope.currentFolder._id)
			$scope.folderEditMode = !$scope.folderEditMode;
	};

	/**
	 * fade out all folders
	 */
	$scope.fadeOutFoldersAndNotes = function(callback){
		if($scope.currentFolder.foldersInside||$scope.currentFolder.notesInside){
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
			$location.url("/folder/"+folder.doc._id);
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
				storageService.database().put($scope.currentFolder).then(function(result){
					$scope.currentFolder._rev=result.rev;
					$rootScope.$emit("reloadListView", {});
					$scope.$apply();
				}).catch(function(error){
					throw error;
					//FIXME conflict resolution
				});
			},
			$scope.currentFolder.name//show the current folder name
		);
	};

	/**
	 * Remove this folder and all sub items
	 */
	$scope.removeFolder = function(){//FIXME Clear orphans
		alertify.confirm("Are you sure you want to delete "+$scope.currentFolder.name+" and all subfolders and notes it contains?",
			function(confirm) {
				if(!confirm)
					return;

				var parentFolderID = $scope.currentFolder.parentFolderID;
				storageService.deleteFolder($scope.currentFolder, function(){
					$rootScope.$emit("reloadListView", {});

					if(!parentFolderID)
						$location.url("/folder/");
					else
						$location.url("/folder/"+parentFolderID);

					$scope.$apply();
				});
		});
	};

	/**
	 * Listen to changed folder events to see if its the current open folder
	 */
	$rootScope.$on("changedFolder", function(event, request) {
	    if(request.folder.parentFolderID==$scope.currentFolder.id || $scope.currentFolder.id==request.oldparentFolderID){//does the change effect us?
	    	$scope.loadCurrentFolder();//reload
	    }
    });

	/**
	 * Create a folder object
	 */
	var createFolder = function(folder){
		folder.type="folder";
		storageService.database().post(folder).then(function(response){
			if(!response.ok)
				throw "//FIXME";
			$rootScope.$emit("reloadListView", {});
			$location.url("/folder/"+response.id);
			$scope.$apply();

		}).catch(function(error){
			console.log(error);//FIXME
		});
	};

	/**
	 * Load the current folders contents
	 */
	var loadCurrentFolderContents = function(){
		storageService.loadFolderContents($scope.currentFolder._id, function (results) {
			$scope.currentFolderContents=results.rows;

			//Do they have anything to display?
				if(!$scope.currentFolder._id && !$scope.currentFolderContents.length)
					alertify.alert("It looks like you dont have any folders. You can create one using the \"New Folder\" button in the top right of the page. If you need to pull your remote notes <a href='#/settings/database'>click here</a>.");

			$scope.$apply();
		});
	};

	/**
	 * Filter out everything but type folder
	 */
	$scope.folderFilter=function(object){
		return storageService.folderFilter(object);
	};

	/**
	 * Filter out everything but type note
	 */
	$scope.noteFilter=function(object){
		return storageService.noteFilter(object);
	};

	//Load current folder
		$timeout($scope.loadCurrentFolder);
});
