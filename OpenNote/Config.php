<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.10.0
**/
//Notice no include here. We need this here because we want to include this without the rest of the include tree
	
	abstract class Config{	
		/**
		 * Security
		 */
		 	public static $secAlwaysUseSSL = false; //Default: false. Script will automatically send people to ssl if it is enabled
		 	public static $loginModulePath = "/modules/login/Authenticater.php"; //path from common
		 	
		/**
		 * Update
		 */
		 	public static $checkForUpdates = false; //Default: true; Check for updates
		 	public static $updateServicePath = "http://stardrive.us/UpdateService/index.php?appName=OpenNote"; //Path to version service
		 	public static $version = "13.12.0-1";
			public static $releaseChannel = "dev"; //Default: prod; Release channel. Prod is production level release. Dev is current deployment release.s
		
		
	}
?>