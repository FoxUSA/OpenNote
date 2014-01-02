<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.10.0
**/
//Notice no include here. We need this here because we want to include this without the rest of the include tree
	
	abstract class Config{
		
		/**
		 * Data base details
		 */
			public static function dbConfig(){
				//Un-comment desired database type
				return self::mysqlConfig();
				//return self::sqliteConfig();
			}

				/**
				 * sql lite
				 */
				private static function sqliteConfig(){			
					//pdo
						//Path to DB. Do not put in webdirectory! If you do anyone can download your database!
						$dbName = "../phplite/OpenNote"; //relative path to sqllite db
						return new PDO(sprintf("sqlite:%s\%s",dirname(__FILE__),$dbName));
				}
				
				/**
				 * mysql
				 */
				private static function mysqlConfig(){			
					//mysql
						$dbUserName = "notebook";
						$dbPassword = "password";
						$dbServer = "127.0.0.1";
						$dbName = "notebook";
						
						return new PDO(sprintf("mysql:host=%s;dbname=%s",$dbServer,$dbName), $dbUserName, $dbPassword);
				}
				
			/**
			 * Which model to use
			 */
			public static function getModel(){
				return new Model();
			}
		
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
		 	public static $loginModulePath = "/modules/login/Authenticater.php"; //path from common
		 	
		/**
		 * Update
		 */
		 	public static $checkForUpdates = false; //Default: true; Check for updates
		 	public static $updateServicePath = "http://stardrive.us/UpdateService/index.php?appName=OpenNote"; //Path to version service
		 	public static $version = "13.12.0-1";
			public static $releaseChannel = "dev"; //Default: prod; Release channel. Prod is production level release. Dev is current deployment release.s
		
		/**
		 * Look and feel
		 */
		 	public static $theme = "light"; //Default: light; //"dark" also available
		 	
		 	 /**
			  * JS dependencies
			  */
			 	public static function getJQueryPath(){
			 		return "./controller/js/jquery.js";
			 	}
				
				public static function getJSDialogPath(){
					 return "./controller/js/jqueryPlugins/jqdialog/jqdialog.min.js";
				}
				
				public static function getJSEditorPath(){
					 return "./controller/js/ckeditor/ckeditor.js";
				}
				
				public static function getJSTreeListPath(){
					 return "./controller/js/jqueryPlugins/jstree/jquery.jstree.js";
				}
				
				/**
				 * All java scripts you want to be included add the the array below
				 */
				public static function getAllJSIncludes(){
					return array(	Config::getJQueryPath(), 
									Config::getJSDialogPath(), 
									Config::getJSEditorPath(), 
									Config::getJSTreeListPath());
				}
			/**
			 * Style
			 */
			 	public static function getStyleSheetPath(){
			 		if(Config::$theme=="dark") 
						return "./style/dark/style.dark.css";
					return "./style/light/style.css";
				}
				
				public static function getJSDialogCSSPath(){
					if(Config::$theme=="dark") 
						return "./controller/js/jqueryPlugins/jqdialog/jqdialog.min.dark.css";
					return "./controller/js/jqueryPlugins/jqdialog/jqdialog.min.css";
				}
				
				/**
				 * All style sheets you want to be included add the the array below
				 */
				public static function getAllCSSIncludes(){
					return array(	Config::getStyleSheetPath(),
									Config::getJSDialogCSSPath());
				}
				
			/**
			 * get web root
			 */
				 public static function getWebRoot(){
				 	return str_replace("\\", "/",str_replace(realpath($_SERVER["DOCUMENT_ROOT"]),"",realpath(dirname(__FILE__))))."/";
				 }
	}
?>