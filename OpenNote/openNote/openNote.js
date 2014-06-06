/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

//Module Declaration
var openNote = angular.module("openNote", ["ngRoute","ngResource", "ngSanitize", "ngAnimate", "ui.tree"]);

/**
 * Used to redirect users to login if their token has expired
 * Runs on every route
 */
openNote.run(function ($rootScope, $location, userService, config, serverConfigService){
    $rootScope.$on("$routeChangeStart", function (event) {
    	//TODO fade in for every view here?
    	
    	//server config values
    		serverConfigService.getConfig().then(function(config){
    			$rootScope.serverConfig=config;
    		}); //atach server config to root scope
    		
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
        	if($location.path()!="/" && !$rootScope.showMenu && !$rootScope.showSideBar){//make sure we only fade in once
	        	userService.useAPITokenHeader();//use token
	        	$rootScope.$emit("reloadListView", {}); //send and event to tell the list view to reload
	        	$rootScope.showMenu=true;
	        	$rootScope.showSideBar=true;
	        	
	        	//options for humans
		        	$rootScope.helpContent=config.getHelpContent();
		        	
		        	$rootScope.showHelpButton = config.showHelpButton();
		        	$rootScope.showLogOutButton = config.showLogOutButton();
		        	
		        	/**
		        	 * Log out function
		        	 */
		        	$rootScope.logOut = function(){
		        		sessionStorage.apiToken=null; 
		        		window.location.href='#/';
		        		$rootScope.showMenu=false;
			        	$rootScope.showSideBar=false;
		        	}		        	
		        	
	        	//$("#menu").fadeIn(config.fadeSpeedLong());
	        	//$("#sideBar").fadeIn(config.fadeSpeedLong());
    		}
        }
    });
});