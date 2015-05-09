/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

/**
 * Control
 */
openNote.controller("listController", function(	$scope,
												$rootScope,
												$timeout,
												storageService,
												userService,
												$timeout,
												config) {
	$scope.data = {};

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
    $rootScope.$on("reloadListView", function(event, args) {//FIXME
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
     * @param item - the item the filter
     */
    var folderFilter = function(item){
    	return item.doc.type=="folder";
    }

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
	    	if(event.dest.nodesScope.$nodeScope != null)
	    		destFolder = event.dest.nodesScope.$nodeScope.$modelValue;

	        var destName="Home";
        	var destID = null
        	if(destFolder!=null){//is dest the home folder?
        		destName=destFolder.doc.name;//Set defaults
        		destID = destFolder.doc._id;
        	}

	        if(sourceFolder.doc.parentFolderID!=destID){
	        	//Confirm action
	        	alertify.confirm("Are you sure you want to move "+sourceFolder.doc.name+" into "+ destName+"?" , function (confirm) {
	        	    if (confirm) {
	        	    	var origParrentFolderID=sourceFolder.parentFolderID;

	        	    	sourceFolder.doc.parentFolderID=destID;
	        	    	storageService.database().put(sourceFolder.doc).then(function(result){
	        	    		$rootScope.$emit("changedFolder", {//fire off an event to tell everyone we just modified a folder
		        	    		folder: sourceFolder,
		        	    		oldParrentFolderID: origParrentFolderID
		        	    	});
	        	    	}).catch(function(error){
	        	    		console.log(error);//FIXME
	    				});
	        	    }
	        	    else
    	    			$rootScope.$emit("reloadListView", {}); //refresh either way
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
    }

    //Load the lists initially
    	$rootScope.$emit("reloadListView");
});
