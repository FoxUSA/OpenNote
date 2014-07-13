var createFolder = function(id,parrentFolderID, name,userID,foldersInside,notesInside,uerID){
	return {
       "id": id,
       "parrentFolderID": parrentFolderID,
       "name": name,
       "userID": userID,
       "foldersInside": foldersInside,
       "notesInside": notesInside,
       "uerID": uerID
    }
};

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
		
		/**
		 * Factory to create controller
		 */
		createController = function(scope, rootScope, location, routeParams, folderFactory, config){
			return $controller("folderController", 
				{$scope:scope}, 
				{$rootScope:rootScope}, 
				{$location:location}, 
				{$routeParams: routeParams}, 
				{folderFactory: folderFactory}, 
				{config:config}
			);
		}
		//{$scope: scope }, $rootScope, $location, {$routeParams: []}, folderFactory, config
	}));
	
	it("should not show folder edit buttons if current folder is home", inject(function($location, config) {//inject location and config
		var folderController = createController($scope, $rootScope, $location, [], null, config);
		$scope.currentFolder = createFolder(null,null,null,null,null,null,null);
		
		expect($scope.folderEditMode).toEqual(false);
		$scope.activateFolderEditMode();//simulate title click
		expect($scope.folderEditMode).toEqual(false);
		
    }));
	
	it("should show folder edit buttons if current folder is not home", inject(function($location, config) {//inject location and config
		var folderController = createController($scope, $rootScope, $location, [], null, config);
		$scope.currentFolder = createFolder(123,null,"Not Home",null,[],[],321);
		
		expect($scope.folderEditMode).toEqual(false);
		$scope.activateFolderEditMode();//simulate title click
		expect($scope.folderEditMode).toEqual(true);		
    }));
	
	/*
	//Todo need to set current folder via like
	it("should push new folder and find no mater folder level and new note only if not at home level", inject(function(folderFactory,$location, config) {//inject location and config
		var folderController = createController($scope, $rootScope, $location, [], folderFactory, config);
		
		$scope.currentFolder = createFolder(null,null,"Home",null,null,null,null);//home folder
		expect($rootScope.buttons.length).toEqual(2);//New folder and find
		
		$scope.currentFolder = createFolder(123,null,"Not Home",null,[],[],321);//child of home
		expect($rootScope.buttons.length).toEqual(3);//Same as above pluss new note
	
    }));
    */
    
});