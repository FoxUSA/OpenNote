/**
 * Connects the the rest service to get user details 
 */
openNote.service("legacyImportService", function (	$http, 
													$q, 
													config,
													storageService,
													userService,
													$rootScope) {
	
	//Used to determin when we are finished looping through the import tree
	var recursion = 0;
	var folderImportSuffix="importFolder";
	
	/**
	 * Set service url
	 * @param url - the url to save
	 */
	this.setServiceURL = function(url){
		localStorage.setItem("serviceURL",url);
	};
	
	/**
	 * Import from legacy
	 */
	this.import = function(){
		if(userService.hasValidToken)
			return $http.get(config.servicePath() +"/folder?includeNotes=true&includeNotesHTML=true&levels=1000").then(function(response){//Successful
					if(response.status!=200)
						return false
					
					//Start the machine
						if(response.data.foldersInside){
							var recursion = response.data.foldersInside.length;
							
							processFolder(response.data);
						}
				},
				function(response){
					return false;
				}
			);
		else
			throw Error("User must be logged in to legacy service.")
	};
	
	/**
	 * Given a folder insert folders and notes
	 */
	var processFolder = function(folder){		
		if(folder.foldersInside){
			recursion+=folder.foldersInside.length;//add our queue to the counter 
			
			folder.foldersInside.forEach(function(childFolder){
				var parentFolderID = childFolder.parrentFolderID;
				if(parentFolderID) //keep it null if it is
					parentFolderID+=folderImportSuffix;
					
				storageService.database().put({_id:childFolder.id+folderImportSuffix,
									parentFolderID:parentFolderID,
									name:childFolder.name,
									type:"folder"});//TODO config folder factory
				processFolder(childFolder);
			})
		};
		
		if(folder.notesInside)
			folder.notesInside.forEach(function(note){
				storageService.database().put({_id:note.id,
					parentFolderID:note.folderID+folderImportSuffix,
					title:note.title,
					note:note.note,
					type:"note"});//TODO config note factory
			});
		
		if(--recursion==0)
			$rootScope.$emit("importComplete");
	};
});