import openNote from "./openNote.js";
/**
 * Angular js config file
 */
openNote.value("config", {

	/**
	 * Get current version
	 */
	getVersion: function(){
		return "17.02.01";
	},

	/**
	 * Get update URL
	 */
	getUpdateURL: function(){
		return "https://cdn.rawgit.com/FoxUSA/OpenNote/master/package.json";
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
