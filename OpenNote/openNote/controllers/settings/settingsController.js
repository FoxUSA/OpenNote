
openNote.controller("settingsController", function(	$scope, 
													$rootScope, 
													$location, 
													$routeParams, 
													storageService, 
													config,
													$timeout) {

	
	/**
	 * fade out all folders
	 */
	$scope.fadeOutBoxes = function(callback){
		$(".box").fadeTo(config.fadeSpeedShort(),0,function(){
			$scope.$apply(function(){
				callback();
			});
		});
	};
	
	/**
	 * Load a settings
	 * @param folder- the folder to load
	 */
	$scope.loadURL = function(url){
		$scope.fadeOutBoxes(function(){
			$location.url(url);
		});
	};
});