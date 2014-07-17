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
openNote.run(function ($rootScope, $location, userService, config, serverConfigService, $http){
    $rootScope.$on("$routeChangeStart", function (event) {    	
    	//server config values
    		serverConfigService.getConfig().then(function(config){
    			if(!config)
    				alertify.error("Connection to service failed");
    			else
    				$rootScope.serverConfig=config;
    		}); //attach server config to root scope
    		
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
        	if($location.path()!="/" && !$rootScope.showMenu && !$rootScope.showSideBar){//make sure we only fade in/run once
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
		        		userService.destroyTokenHeader();
		        		window.location.href='#/';
		        		$rootScope.showMenu=false;
			        	$rootScope.showSideBar=false;
		        	}		        	
		        
	        	//Check for updates
		        	$http.get(config.getUpdateURL()).then(
	        			function(response){//Successful
	        				if(response.data.version!=config.getVersion())
	        					alertify.log("<a href='"+response.data.updateURL+"' target='_blank'>"+response.data.updateText+"</a>", "", 0);
	        			}
	        		);
    		}
        }
    });
});