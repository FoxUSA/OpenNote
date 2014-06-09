/**
 * Angular js config file
 */
openNote.value("config", {
	
	/**
	 * http path to backend rest service
	 */
	servicePath: function(){
		return "http://127.0.0.1/OpenNoteService-PHP/Service";
	},
	
	/**
	 * Used to compute randome short fade speed
	 */
	fadeSpeedShort: function(){ 
		return 250*Math.random()+200;
	},
	
	/**
	 * Used to compute randome long fade speed
	 */
	fadeSpeedLong: function(){
		return 2000*Math.random()+200;
	},
	
	/**
	 * returns help contents
	 */
	getHelpContent: function(){
		return {
			homeButton: "Click here to return to home page",
			listArea:"",
			newNoteButton:"",
			newFolderButton:"",
			findButton:"",
			folderEditModeButton:"",
			folderArea:""
		}
	},
	
	/**
	 * Do we want to show the help button
	 */
	showHelpButton: function(){
		return true;
	},
	
	/**
	 * Do we want to show the log Out button
	 */
	showLogOutButton: function(){
		return true;
	},
	
	/**
	 * Get server config
	 * return - 
	 */
	getServerConfig: function(){
		return $resource(config.servicePath()+"/config/", {}, {//{} default params
	        get: {
	            method: "GET"
	        }
	    }).$get();
	},
	
	/**
	 * See if we are dark or light
	 */
	isDarkTheme: function(){
		return false;
	}	
});