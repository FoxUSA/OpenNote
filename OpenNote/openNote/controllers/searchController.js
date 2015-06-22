/**
 * Search
 */
openNote.controller("searchController", function(	$scope, 
													$rootScope, 
													config,
													storageService,
													$location) {
	/**
	 * Default valie
	 */
	$scope.searchRequest={
			type: "Both",
			field: "Both",
			search: ""
	};
	
	$scope.notes;
	$scope.folders
	
	/**
	 * Search the database
	 */
	$scope.search = function(){
		$scope.notes=[];
		$scope.folders=[];
		
		var removeDuplicates = function(array, callback){
			var listOfIDs = [];
			array.forEach(function(element){//for each is synchronous
				var index=listOfIDs.indexOf(element.id);
				if(index==-1){
					listOfIDs.push(element.id);
				}else
					array.splice(index, 1);
			});
			return array;
		}
		
		var appendNotes = function(notes){
			$scope.notes=removeDuplicates($scope.notes.concat(notes));
			$scope.$apply();
		};
		
		var appendFolders = function(folders){
			$scope.folders=$scope.folders.concat(folders);
			$scope.$apply();
		};

		var type = $scope.searchRequest.type;
		var search = $scope.searchRequest.search;
		var field = $scope.searchRequest.field;
		
		if(type=="Both" || type=="Folders")
			storageService.searchFolderNames(search,appendFolders);
		
		if(type=="Both" || type=="Notes"){
			if(field=="Both" || type=="Title")
				storageService.searchNoteTitles(search,appendNotes);
				
			if(field=="Both" || type=="Body")
				storageService.searchNoteBody(search,appendNotes);
		};
	}
	
	/**
	 * Load a folder
	 * @param folder- the folder to load
	 */
	$scope.loadFolder = function(folder){
		$scope.fadeOutBoxes(function(){
			$location.url("/folder/"+folder.doc._id);
		});
	};
	
	/**
	 * Load a note
	 * @param note - load a note
	 */
	$scope.loadNote = function(note){
		$scope.fadeOutBoxes(function(){
			$location.url("/note/"+note.doc._id);
		});
	};
	
	/**
	 * fade out all boxes
	 */
	$scope.fadeOutBoxes = function(callback){
		$(".box").fadeOut(config.fadeSpeedShort(),function(){
			$scope.$apply(function(){
				callback();
			});
		});
	};
});