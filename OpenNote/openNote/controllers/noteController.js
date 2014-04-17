/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("noteController", function($scope, userService, $location, $routeParams,noteFactory, config) {
	/**
	 * Load folder contents
	 */
	var temp = new noteFactory();
	temp.$get({id:$routeParams.id}).then(function(note){
		$scope.note=note;
		$(".notePartial").fadeIn(config.fadeSpeedLong);
	});
	
});