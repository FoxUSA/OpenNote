/**
 * Control 
 */
openNote.controller("listController", function($scope, $rootScope, folderFactory) {	
	$scope.data = new folderFactory();
	
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
    $rootScope.$on("reloadListView", function(event, args) {
	    $scope.data.$get({levels:100});
    });
    
    /**
     * List Config object
     */
    $scope.options = {
    	/**
    	 * Drag event logic
    	 */
		dropped: function(event) {
	    	var sourceFolder = event.source.nodeScope.$modelValue;
	    	
	    	var destFolder=null;
	    	if(event.dest.nodesScope.$nodeScope != null)
	    		destFolder = event.dest.nodesScope.$nodeScope.$modelValue;
	        
	        var destName="Home";
        	var destID = null
        	if(destFolder!=null){//is dest the home folder?
        		destName=destFolder.name;//Set defaults
        		destID = destFolder.id;
        	}
	        
	        if(sourceFolder.parrentFolderID!=destID){
	        	//Confirm action
	        	alertify.confirm("Are you sure you want to move "+sourceFolder.name+" into "+ destName+"?" , function (confirm) {
	        	    if (confirm) {
	        	    	var folderType = new folderFactory();
	        	    	var origParrentFolderID=sourceFolder.parrentFolderID;
	        	    	
	        	    	sourceFolder.__proto__=folderType.__proto__;//Cast this object as a resources
	        	    	
	        	    	
	        	    	sourceFolder.parrentFolderID=destID;
	        	    	sourceFolder.$update({levels: null});
	        	    	
	        	    	//fire off an event to tell everyone we just modified a folder
		        	    	$rootScope.$emit("changedFolder", {
		        	    		folder: sourceFolder, 
		        	    		oldParrentFolderID: origParrentFolderID
		        	    	});
	        	    }
	        	    $rootScope.$emit("reloadListView", {}); //refresh either way
	        	    //TODO if they cancel reset list instead of re pulling it
	        	    
	        	});
	        }	
	    }
    };
});