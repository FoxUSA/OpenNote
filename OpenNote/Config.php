<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.10.0
**/
	include_once dirname(__FILE__)."/controller/Common.php";
	
	abstract class Config{
		
		/**
		 * Data base details
		 */
			public static $dbUserName = "notebook";
			public static $dbPassword = "password";
			public static $dbServer = "localhost";
			public static $dbName = "notebook";
			
		/**
		 * Upload
		 */
		 	public static $uploadEnabled = true;//Default: true. Allwer users to upload files.
			
		/**
		 * Registration
		 */
		 	public static $registrationEnabled = true; //Default: true. Allow users to register.
			
		/**
		 * Security
		 */
		 	public static $secAlwaysUseSSL = false; //Default: false. Script will automatically send people to ssl if it is enabled
	}

?>