/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * controller for note creation, editing and maintenance
 */
openNote.controller("noteController", function(	$scope, 
												$rootScope, 
												$routeParams, 
												$location, 
												$routeParams, 
												storageService, 
												config, 
												serverConfigService, 
												$sce) {
	$rootScope.buttons=[];
	$scope.note = {};
	$scope.editMode = false;
	$scope.showDeleteButton = false;
	
	/**
	 * Returns the save buttons object
	 */
	var saveButton = function(){
		return {
			text: "Save",
			action: function(){
				$scope.save();
			},
			helpText: $rootScope.helpContent.saveButton
		};
	};
	
	/**
	 * return the clear button
	 */
	var clearButton = function(){
		return {
			text: "Clear",
			action: function(){
				$scope.clear();
			},
			helpText: $rootScope.helpContent.clearButton
		};
	};
	
	/**
	 * Take us into edit mode
	 */
	var activateEditMode = function(){		
		serverConfigService.getEditorConfig().then(function(config){
			$scope.editMode=true;
			
			if($scope.note._id !=null)
				$scope.showDeleteButton = true;
			
			CKEDITOR.replace("note", config);
			$rootScope.buttons=[];
			
			attachWindowUnload();
			
			//Add new buttons
				$rootScope.buttons.push(saveButton());
				$rootScope.buttons.push(clearButton());
		});	
	};
	
	//Load or new
		if($routeParams.id==null){//new
			$scope.note._id = null;
			$scope.note.parentFolderID = $location.search().folderID;
			$scope.note.title = "Note Title";
			
			activateEditMode();
			$(".notePartial").fadeIn(config.fadeSpeedLong());
		}
		else{
			/**
			 * Load note
			 */
			storageService.database().get($routeParams.id).then(function(doc){
				$scope.note=doc;
				$(".notePartial").fadeIn(config.fadeSpeedLong());
				$scope.$apply();
			});	
			
			//Add buttons
				$rootScope.buttons.push({
					text: "Go up a folder",
					action: function(){
						$location.url("/folder/"+$scope.note.parentFolderID);
					},
					helpText: $rootScope.helpContent.editButton
				});
			
				$rootScope.buttons.push({
					text: "Edit",
					action: function(){
						activateEditMode();
					},
					helpText: $rootScope.helpContent.editButton
				});
		}
		
	/** 
	 * Save a note
	 */
	$scope.save = function(){
		$scope.note.note = CKEDITOR.instances["note"].getData();
		
		$(".notePartial").fadeOut(config.fadeSpeedShort());
		createNote($scope.note);
	}
	
	/**
	 * Delete a note
	 */
	$scope.delete = function(){
		alertify.confirm("Are you sure you want to delete this note?",
			function(confirm) {	
				if(!confirm)
					return;
				
				var folderID = $scope.note.parentFolderID;//need to keep track of this because we are about to delete it
				$(".notePartial").fadeOut(config.fadeSpeedShort());
				storageService.database().remove($scope.note).then(function(){
					detachWindowUnload();
					alertify.success("Note Deleted",5); //all done. close the notify dialog 
					$location.url("/folder/"+folderID);
					$scope.$apply();
				});
			}
		);
	}
	
	/**
	 * Reset changes
	 */
	$scope.clear = function(){
		alertify.confirm("Are you sure you want to clear your changes?",
			function(confirm) {
				if(!confirm)
					return;
				
				$(".notePartial").fadeOut(config.fadeSpeedShort(),function(){
					$scope.$apply(function(){
						detachWindowUnload();
						$location.url("/folder/"+$scope.note.parentFolderID);
					});
				});
			});
	};
	
	/**
	 * Mark html as trusted
	 */
	$scope.trustHTML = function(html) {
	    return $sce.trustAsHtml(html);
	};
	
	/**
	 * Attach window on-load listener 
	 */
	var attachWindowUnload = function(){
		window.onbeforeunload = function() {
            return "Are you sure you want to navigate away?";//Keep the page from closing
		};
	};
	
	/**
	 * Remove window on-load listener 
	 */
	var detachWindowUnload = function(){
		window.onbeforeunload = null;
	};
	
	/**
	 * Create a note object
	 */
	var createNote = function(note){
		note.type="note";
		
		/**
		 * Callback after successful save to reload note
		 */
		var saveCallback = function(response){
			if(!response.ok)	
				throw "//FIXME";//FIXME
			detachWindowUnload();
			$location.url("/note/"+response.id+"?rev="+response.rev);//revision number is here only to force angular to reload
			alertify.success("Note Saved"); //all done. close the notify dialog
			$scope.$apply();
		}
		
		//Upsert
			if(note._id==null)
				storageService.database().post(note).then(saveCallback).catch(function(error){
					alertify.error("Error saving note")
				});
			else
				storageService.database().put(note).then(saveCallback).catch(function(error){
					alertify.error("Error saving note")
				});
	};
});