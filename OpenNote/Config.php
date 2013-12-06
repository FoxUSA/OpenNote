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
		 
	}

?>