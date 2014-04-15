/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("folderController", function($scope, userService, $location, $routeParams,folderFactory, config) {
	$scope.notes=[];
	$scope.folders=[];
	
	$("#menu").fadeIn(config.fadeSpeedLong());
	$("#sideBar").fadeIn(config.fadeSpeedLong());

	
	var temp = new folderFactory();
	temp.$get().then(function(data){
		$scope.folders =data.foldersInside;
	});
	
	$scope.loadFolder = function(folder){
		$(".folder").fadeOut(config.fadeSpeedShort(),function(){
			$scope.$apply(function(){
				//$location.hash(folder.id);
				$scope.folders=folder.foldersInside;
			});
		});
	}
});