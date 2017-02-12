/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

/**
 * Control
 */
openNote.controller("tagListController", function(	$scope,
													$rootScope,
													tagService,
													$location,
													storageService) {
	$scope.tags = [];

	var updateTags = function(){
		tagService.getMap().then(function(map){
			$scope.tags = [];
			for(var tag in map.tags)
				$scope.tags.push(tag);

			$scope.$apply();
		});
	};

	/**
	 * Open a tag
	 * @param tag - Tag to open
	 */
	$scope.openTag = function(tag){
		$location.url("/tag/"+encodeURIComponent(tag));
	};

	/**
     * Move key
	 * @param request.destFolder -
	 * @param request.moveObject - object to move
	 * TODO this is should be moved. It is left over from the list controller days
	 */
    $rootScope.$on("moveKey", function(event, request) {
		//Confirm action
		alertify.confirm("Are you sure you want to move "+(request.moveObject.name || request.moveObject.title)+" into "+ request.destFolder.name+"?" , function (confirm) {
			if (confirm){
				var origParrentFolderID=request.moveObject.parentFolderID;

				request.moveObject.parentFolderID=request.destFolder._id;
				storageService.database().put(request.moveObject).then(function(){
					$rootScope.$emit("changedFolder", {//fire off an event to tell everyone we just modified a folder
						folder: request.moveObject,
						oldParrentFolderID: origParrentFolderID
					});
				}).catch(function(error){
					throw error;
				});
			}

			return $rootScope.$emit("reloadListView", {});//Always reload
		});
    });

	$rootScope.$on("tagsUpdated", function() {
		updateTags();
	});

	updateTags();
});
