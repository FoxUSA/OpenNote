<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/
	include_once dirname(__FILE__)."/interfaces/ICore.php";
	include_once dirname(__FILE__).'/../../common.php';
	
	class Core implements ICore{
		//PDO object
			private static $pdo;
		
		public function Core(){
			
		}
		
		/**
		 * Connect to MYSQL app DB
		 * @return - returns true if connected
		 */
		public static function connect(){
			try{
				if(self::$pdo == NULL)
					self::$pdo = Config::dbConfig();
	 			
				//ping equivalent
					try{
						self::$pdo->query("SELECT 1");
					}
					catch (Exception $e){
						self::$pdo = dbConfig();
					}
				}
			catch (Exception $e){
				return FALSE;
			}
			
			return TRUE;
		}
		
		/**
		 * Disconnect from MYSQL
		 */
		public static function disconnect(){
			self::$pdo = NULL;
		}
		
		/**
		 * runs a query
		 * @param query - the query to run
		 * @param param - the parameters of the query. May be null
		 * @return - the query return
		 */
		public static function query($query, $param = null){		
			if(!self::connect())
				die ("Could not connect to sql server");
					
			if(!($stmt = self::$pdo->prepare($query))) //prepare the query
				die("There was an error with the query");	
			
			if(!$stmt->execute($param)) //execute the statement	
				die("The query did not work.");
				
			return $stmt->fetchAll();
		}
		
		/**
		 * @return - returns the id of the last inserted row
		 */
		public static function getInsertID(){
			return self::$pdo->lastInsertId();//TODO may have threading problem
		}
	}
?>