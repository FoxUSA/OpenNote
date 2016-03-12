var createFolder = function(id,parentFolderID, name){
	return {
       "_id": id,
       "parentFolderID": parentFolderID,
       "name": name
   };
};

//TODO storageService save folder twice

describe("folderController", function() {
	var $scope;
	var createController;
	var $rootScope;

	//load openNote module
		beforeEach(module("openNote"));

	/**
	 * Setup the folder controller
	 */
	beforeEach(inject(function($controller, $rootScope){
		$scope = $rootScope.$new();
		this.$rootScope=$rootScope;

		$rootScope.helpContent={
			newNoteButton: "",
			newFolderButton: "",
			findButton: ""
		};

		$rootScope.buttons=[];

		/**
		 * Factory to create mock controller
		 */
		createController = function(scope, rootScope, location, routeParams, storageService, config, timeout){
			return $controller("folderController",
				{$scope:scope},
				{$rootScope:rootScope},
				{$location:location},
				{$routeParams: routeParams},
				{storageService: storageService},
				{config:config},
				{$timeout:timeout}
			);
		};
	}));

	it("should not show folder edit buttons if current folder is home", inject(function() {//inject location and config
		$scope.currentFolder = createFolder(null,null,null);

		expect($scope.folderEditMode).toEqual(false);
		$scope.activateFolderEditMode();//simulate title click
		expect($scope.folderEditMode).toEqual(false);

    }));

	it("should show folder edit buttons if current folder is not home", inject(function() {//inject location and config
		$scope.currentFolder = createFolder(123,null,"Not Home");

		expect($scope.folderEditMode).toEqual(false);
		$scope.activateFolderEditMode();//simulate title click
		expect($scope.folderEditMode).toEqual(true);
    }));
});
