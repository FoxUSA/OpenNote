/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

//Module Declaration
var openNote = angular.module("openNote", [	"ngRoute",
                                           	"ngResource", 
                                           	"ngSanitize", 
                                           	"ngAnimate", 
                                           	"ui.tree"]);

/**
 * Used to redirect users to login if their token has expired
 * Runs on every route
 */
openNote.run(function (	$rootScope, 
						$location, 
						userService, 
						config, 
						serverConfigService, 
						$http){
    $rootScope.$on("$routeChangeStart", function (event) {    	
    	//server config values
    		serverConfigService.getConfig().then(function(config){
    			if(!config)
    				alertify.error("Connection to service failed");
    			else
    				$rootScope.serverConfig=config;
    		}); //attach server config to root scope
    		
    	//Authentication and authorization enforcer
	        if (isLoggedInOrIsOnLoginScreen())//Initial entry if not logged in
	        	forceLogin(event, $location.url());
	        else//Initial entry after if logged in 
	        	if($location.path()!="/" && !$rootScope.showMenu && !$rootScope.showSideBar)//make sure we only fade in/run once
	        		$rootScope.$emit("init");
        
    });
    
    /**
     * Check to see if user is logged in or on the login screen
     */
    var isLoggedInOrIsOnLoginScreen = function(){
    	return !userService.hasValidToken()&&$location.path()!="/";
    }
    
    /**
     * Force user to login 
     * @param event - the event this was called
     * @param url - the url the user tried to get
     */
    var forceLogin = function(event, url){
    	if(event!=null)
    		event.preventDefault(); 
    	
    	if(entryURL!=null && (entryURL.trim()=="" || entryURL.trim()=="/"))
    		$rootScope.entryURL=url;
    	else
    		$rootScope.entryURL=null;
    	
        $location.path("/");
    }
    
    /**
     * Initialize app and start fade in
     */
    $rootScope.$on("init",function(){
    	userService.useAPITokenHeader();//use token
    	    	
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
        		$rootScope.$emit("logOut");
        	};		        	
        
    	//Check for updates
        	$http.get(config.getUpdateURL()).then(
    			function(response){//Successful
    				if(response.data.version!=config.getVersion())
    					alertify.log("<a href='"+response.data.updateURL+"' target='_blank'>"+response.data.updateText+"</a>", "", 0);
    			});
    });
    
    /**
     * Handle logOut event
     */
    $rootScope.$on("logOut",function(){
    	userService.destroyTokenHeader();
		window.location.href='#/';
		$rootScope.showMenu=false;
    	$rootScope.showSideBar=false;
    })
});