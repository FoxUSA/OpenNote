/**
 * Control 
 */
openNote.controller("listController", function($scope, $rootScope, folderFactory) {	
	
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
	    $scope.data = new folderFactory();
	    $scope.data.$get({levels:100}).then(function(data){
	    	getRootNodesScope().collapseAll();
	    });
    });
    
});