//Module Declaration
var openNote = angular.module("openNote", ["ngRoute","ngResource", "ngSanitize", "ngAnimate", "ui.tree"]);

/**
 * Used to redirect users to login if their token has expired
 * Runs on every route
 */
openNote.run(function ($rootScope, $location, userService, config){
    $rootScope.$on("$routeChangeStart", function (event) {
    	//TODO fade in for every view here?
    	/**
    	 * Initial entry if not logged in
    	 */
        if (!userService.hasValidToken()&&$location.path()!="/") {
            event.preventDefault();
            $location.path("/");
        }
        else{
        	/**
        	 * Initial entry after if logged in
        	 */
        	if($location.path()!="/" && !$("#menu").is(":visible") && !$("#sideBar").is(":visible")){//make sure we only fade in once
	        	userService.useAPITokenHeader();//use token
	        	$rootScope.$emit("reloadListView", {}); //send and event to tell the list view to reload
	        	$rootScope.showMenu=true;
	        	$rootScope.showSideBar=true;
	        	//$("#menu").fadeIn(config.fadeSpeedLong());
	        	//$("#sideBar").fadeIn(config.fadeSpeedLong());
    		}
        }
    });
});