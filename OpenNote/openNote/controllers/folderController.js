/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("folderController", function($scope, userService, $location, $routeParams) {
	$scope.notes="";
	$scope.folders="";
	
	$("#menu").fadeIn(config.fadeSpeedLong()*Math.random()+200);
	$("#sideBar").fadeIn(config.fadeSpeedLong()*Math.random()+200);
	
	$scope.notes=[{title: "Test", id: 1}];
});