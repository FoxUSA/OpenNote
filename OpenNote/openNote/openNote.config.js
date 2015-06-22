/**
 * Angular js config file
 */
openNote.value("config", {

	/**
	 * Get current version
	 */
	getVersion: function(){
		return "15.07.00";
	},

	/**
	 * Get update URL
	 */
	getUpdateURL: function(){
		return "//stardrive.us/UpdateService/?appName=OpenNote-prod";
	},

	/**
	 * http path to backend rest service
	 */
	servicePath: function(){
		var url = localStorage.getItem("serviceURL");
		if(url)
			return url;

		return "./Service/service.php";
	},

	/**
	 * Used to compute random short fade speed
	 */
	fadeSpeedShort: function(){
		return 250*Math.random()+200;
	},

	/**
	 * Used to compute random long fade speed
	 */
	fadeSpeedLong: function(){
		return 2000*Math.random()+200;
	},

	/**
	 * returns help contents
	 */
	getHelpContent: function(){
		return {
			homeButton: "Click here to return to home page.",
			listArea: "This area gives you a high level tree view of the folder structure. You can drag folder to re-arange them. To drag a folder into another, the parrent folder must be open.",
			newNoteButton: "Allows you to create a new note in the the current folder.",
			newFolderButton: "Allows you to create a sub folder in the current folder.",
			findButton: "Launches the folder/note find utility.",
			folderEditModeButton: "Click this button to reveal edit mode buttons. You cannot edit the Home folder.",
			viewArea: "This is the main area. Folder browser and note editor are displayed here.",
			noteBody: "This is the main note body. If edit mode is enabled this becomes the editor.",
			clearButton: "Press this button to revert current changes.",
			saveButton: "Click this to save this note. Old version are kept.",
			editButton: "Click this to change the note into edit mode.",
			noteTitle: "This the note title field. In edit mode, you can use it to edit the notes title."
		}
	},

	/**
	 * Do we want to show the help button
	 */
	showHelpButton: function(){
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

/**
 * Change link behavior to not be stupid an allow all href links
 * @param $compileProvider
 */
openNote.config(function($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist("[\s\S]*");
});
