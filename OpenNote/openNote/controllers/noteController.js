/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("noteController", function($scope,$rootScope, $routeParams, $location, $routeParams,noteFactory, config) {
	$rootScope.buttons=[];
	$scope.note = new noteFactory();
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
				$.jqDialog.confirm("Are you sure you want to clear your changes?",
					function() { 
						$(".notePartial").fadeOut(config.fadeSpeedShort(),function(){
							$scope.$apply(function(){
								$location.url("/folder/"+$scope.note.folderID);
							});
						});
					},		// callback function for 'YES' button
					null	//callback function for 'NO' button
				);
			}
		};
	};
	
	/**
	 * Take us into edit mode
	 */
	var activateEditMode = function(){
		$scope.editMode=true;
		
		if($scope.note.id !=null)
			$scope.showDeleteButton = true;
		
		CKEDITOR.replace("note", config.editorConfig(true));
		$rootScope.buttons=[];
		
		//Add new buttons
			$rootScope.buttons.push(saveButton());
			$rootScope.buttons.push(clearButton());
	}
	
	//Load or new
		if($routeParams.id==null){//new
			$scope.note.id = null;
			$scope.note.folderID = $location.search().folderID;
			$scope.note.title = "Note Title";
			
			activateEditMode();
			$(".notePartial").fadeIn(config.fadeSpeedLong());
		}
		else{
			/**
			 * Load folder contents
			 */
			$scope.note.$get({id:$routeParams.id}).then(function(note){
				$(".notePartial").fadeIn(config.fadeSpeedLong());
			});
			
			//Add buttons
				$rootScope.buttons.push({
					text: "Edit",
					action: function(){
						activateEditMode();
					}
				});
		}
		
	/** 
	 * Save a note
	 */
	$scope.save = function(){
		
		$scope.note.note = CKEDITOR.instances["note"].getData();
		
		//Insert only logic
			if($scope.note.originNoteID == null)
				$scope.note.originNoteID=$scope.note.id;//Make this not a child of the one we opened
		
		$(".notePartial").fadeOut(config.fadeSpeedShort());
		$scope.note.$save().then(function(){
			$location.url("/note/"+$scope.note.id)
			$.jqDialog.notify("Note Saved",5); //all done. close the notify dialog 
		});
		
	}
	
	/**
	 * Delete a note
	 */
	$scope.delete = function(){
		$.jqDialog.confirm("Are you sure you want to delete this note?",
			function() {	
				var folderID = $scope.note.folderID;//need to keep track of this because we are about to delete it
				$(".notePartial").fadeOut(config.fadeSpeedShort());
				$scope.note.$remove({id: $scope.note.id}).then(function(){
					$.jqDialog.notify("Note Deleted",5); //all done. close the notify dialog 
					$location.url("/folder/"+folderID);
				});
			},		// callback function for 'YES' button
			null	//call back for no
		);
	}
});