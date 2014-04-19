//Module Declaration
var openNote = angular.module("openNote", ["ngRoute","ngResource", "ngSanitize"]);

/**
 * Used to redirect users to login if their token has expired
 */
openNote.run(function ($rootScope, $location, userService, config){
    $rootScope.$on("$routeChangeStart", function (event) {
    	//TODO fade in for every view here?
        if (!userService.hasValidToken()&&$location.path()!="/") {
            event.preventDefault();
            $location.path("/");
        }
        else{
        	if($location.path()!="/" && !$("#menu").is(':visible') && !$("#sideBar").is(':visible')){//make sure we only fade in once
	        	$("#menu").fadeIn(config.fadeSpeedLong());
	        	$("#sideBar").fadeIn(config.fadeSpeedLong());
    		}
        }
    });
});