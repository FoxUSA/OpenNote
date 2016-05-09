/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

/**
 * Control
 */
openNote.controller("listController", function(	$scope,
												$rootScope,
												storageService,
												userService,
												$timeout,
												config) {
	$scope.data = [];

	/**
	 * Toggle collapse
	 */
    $scope.toggle = function(scope) {
    	scope.toggle();
    };

    /**
     * get the root node scope
     */
    var getRootNodesScope = function() {
    	return angular.element(document.getElementById("tree-root")).scope();
    };

    /**
     * Collapse All
     */
    $scope.collapseAll = function() {
    	var scope = getRootNodesScope();
    	scope.collapseAll();
    };

    /**
     * expand all
     */
    $scope.expandAll = function() {
    	var scope = getRootNodesScope();
    	scope.expandAll();
    };

    /**
     * Load list view
     */
    $rootScope.$on("reloadListView", function() {//FIXME
		if(window.innerWidth<750)//Dont do anything if we are not larger than bootstrap xs
			return;

    	storageService.loadFolderContents(null, function (results) {
				$scope.data=results.rows.filter(folderFilter);
				$scope.data.forEach(loadFolderContents);

				$scope.treeBuffer = 0;
				$timeout(increaseTreeBuffer,config.fadeSpeedLong());
			});
    });

	/**
	 *
     * Move key
	 * @param request.destFolder -
	 * @param request.moveObject - object to move
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

    /**
     * @param item - the item the filter
     */
    var folderFilter = function(item){
    	return item.doc.type=="folder";
    };

	/**
	 * Load the current folders contents
	 * @param folder - the folder to pull the content from
	 */
	var loadFolderContents = function(folder){
		storageService.loadFolderContents(folder.doc._id,function (results) {
			folder.foldersInside=results.rows.filter(folderFilter);
			folder.foldersInside.forEach(loadFolderContents);
		});
	};

    /**
     * List Config object
     */
    $scope.options = {
    	/**
    	 * Drag event logic
    	 */
		beforeDrop: function(event) {
	    	var sourceFolder = event.source.nodeScope.$modelValue;

	    	var destFolder=null;
	    	if(event.dest.nodesScope.$nodeScope)
	    		destFolder = event.dest.nodesScope.$nodeScope.$modelValue;

        	if(!destFolder){//is dest the home folder?
				destFolder={
					doc:{
						name: "Home",
						_id:null
					}
				};
        	}

	        if(sourceFolder.doc.parentFolderID!=destFolder.doc._id){
				$rootScope.$emit("moveKey", {//fire off an event to tell everyone we just modified a folder
					destFolder: destFolder.doc,
					moveObject: sourceFolder.doc
				});
	        }
	    }
    };

    /**
    * Render list slowly
    */
    var increaseTreeBuffer = function(){
        if($scope.treeBuffer<=$scope.data.length) {
        	$scope.treeBuffer++;
            $timeout(increaseTreeBuffer, 100);
        }
        else
            $rootScope.$emit("listLoaded", {});//Tell the world we are done
    };

    //Load the lists initially
    	$rootScope.$emit("reloadListView");
});
