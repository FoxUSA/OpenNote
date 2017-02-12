/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

/**
 * controller for note creation, editing and maintenance
 */
openNote.controller("noteController", function(	$scope,
												$rootScope,
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
				save();
			},
			helpText: $rootScope.helpContent.saveButton
		};
	};

	var copyButton = function(note){
		return {
			text: "Cut",
			action: function(){
				$rootScope.clipboard=note;
				alertify.success("Note copied to clipboard");
			}
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

	var editButton = function(){
		return {
			text: "Edit",
			action: function(){
				activateEditMode();
			},
			helpText: $rootScope.helpContent.editButton
		};
	};

	var upButton = function(folderID){
		return {
			text: "Go up a folder",
			action: function(){
				$location.url("/folder/"+folderID);
			},
			helpText: $rootScope.helpContent.editButton
		};
	};

	/**
	 * Take us into edit mode
	 */
	var activateEditMode = function(){
		serverConfigService.getEditorConfig().then(function(config){
			$scope.editMode=true;

			if($scope.note._id)
				$scope.showDeleteButton = true;

			CKEDITOR.replace("note", config);
			$rootScope.buttons=[];

			attachWindowUnload();

			//Add new buttons
				$rootScope.buttons.push(saveButton());
				$rootScope.buttons.push(clearButton());
		});
	};

	/**
	 * Save a note
	 */
	var save = function(){
		$scope.note.note = CKEDITOR.instances.note.getData();

		$(".notePartial").fadeOut(config.fadeSpeedShort(),function(){
			$scope.note.type="note";

			/**
			 * Callback after successful save to reload note
			 */
			var saveCallback = function(response){
				if(!response.ok)
					throw "//FIXME";//FIXME
				detachWindowUnload();

				//Tags
					$scope.note._id=response.id;
					$rootScope.$emit("noteSaved",$scope.note);//Let any number of services know we have saved a note

				$location.url("/note/"+response.id+"?rev="+response.rev);//revision number is here only to force angular to reload
				alertify.success("Note Saved"); //all done. close the notify dialog
				$scope.$apply();
			};

			//Upsert
				if(!$scope.note._id)
					storageService.database().post($scope.note).then(saveCallback,function(){
						alertify.error("Error saving note");
					});
				else
					storageService.database().put($scope.note).then(saveCallback,function(){
						alertify.error("Error modifing note");
					});
		});
	};

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
					$rootScope.$emit("noteDeleted",$scope.note);
					detachWindowUnload();
					alertify.success("Note Deleted"); //all done. close the notify dialog
					$location.url("/folder/"+folderID);
					$scope.$apply();
				});
			}
		);
	};

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

	//Load or new
		if(!$routeParams.id){//new
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

				//Add buttons
					$rootScope.buttons.push(upButton($scope.note.parentFolderID));
					$rootScope.buttons.push(copyButton($scope.note));
					$rootScope.buttons.push(editButton());

				$scope.$apply();
			});
		}
});
