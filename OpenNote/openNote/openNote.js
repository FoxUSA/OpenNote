/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

//Module Declaration
var openNote = angular.module("openNote", [	"ngRoute",
                                           	"ngResource",
                                           	"ngSanitize",
                                           	"ngAnimate",
                                           	"ui.tree",
                                           	"ngFileUpload"]);

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

	$rootScope.helpContent=config.getHelpContent();

    $rootScope.$on("$routeChangeStart", function (event) {
    	//server config values
    		serverConfigService.getConfig().then(function(config){
    			if(!config)
    				alertify.error("Connection to service failed");
    			else
    				$rootScope.serverConfig=config;
    		}); //attach server config to root scope

    	//Initial entry after if logged in
        	if(!$rootScope.showMenu && !$rootScope.showSideBar)//make sure we only fade in/run once
        		$rootScope.$emit("init");
    });

    /**
     * Refresh token
     */
    var tokenRefresh = function(){
		userService.login().then(function(response){
			if(response)
				alertify.success("Token refreshed");
			else
				alertify.error("Refreshed token failed");
		}).catch(function(error){
			alertify.error("Refreshed token failed");
		});

	};


    /**
     * Initialize app and start fade in
     */
    $rootScope.$on("init",function(){
    	userService.useAPITokenHeader();//use token

    	$rootScope.showMenu=true;
    	$rootScope.showSideBar=true;

    	//options for humans
        	$rootScope.showHelpButton = config.showHelpButton();

    	//Check for updates
        	$http.get(config.getUpdateURL()).then(
    			function(response){//Successful
    				if(response.data.version!=config.getVersion())
    					alertify.log("<a href='"+response.data.updateURL+"' target='_blank'>"+response.data.updateText+"</a>", "", 0);
    			}
			);

        //Setup auto login interval
        	if(userService.getUsername() && !$rootScope.autoLogInInterval){
        		tokenRefresh();
        		$rootScope.autoLogInInterval=setInterval(tokenRefresh, 1800000);
        	};
	});


});
