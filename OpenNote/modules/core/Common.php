<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/
	include_once dirname(__FILE__)."/../../NoteBook.php";
	include_once dirname(__FILE__)."/../../NoteEditor.php";
	include_once dirname(__FILE__)."/../../ajax.php";
	include_once dirname(__FILE__)."/../login/Authenticater.php";	
	include_once dirname(__FILE__)."../interfaces/ICore.php";	
	
	//clean inputs to prevent sql injection
	foreach($_POST as $key => $val) {
		if(isset($_GET[$key])&&is_String($_GET[$key])){
			$_POST[$key] = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
			$key = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
		}
	}
	
	foreach($_GET as $key => $val) {
		if(isset($_GET[$key])&&is_String($_GET[$key])){
			$_GET[$key] = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
			$key = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
		}
	}
	
	Authenticater::sessionHeader(); //this page gets included as part of the include tree. This method will be called for every page

	class Core implements ICore{
		//mysql connection info
			static $mysqlServer = "localhost";
			static $mysqlUser = "notebook";
			static $mysqlPass = "password";
			static $mysqlDB = "notebook";
			
		//PDO object
			private static $pdo;
		
		public function Core(){
			
		}
		
		/**
		 * Connect to MYSQL app DB
		 * @return - returns true if connected
		 */
		private static function mysqlConnect(){
			if(self::$pdo == NULL)
				self::$pdo = new PDO(sprintf("mysql:host=%s;dbname=%s",self::$mysqlServer,self::$mysqlDB), self::$mysqlUser, self::$mysqlPass);
 			
			//ping equivalent
				try{
					self::$pdo->query("SELECT 1");
				}
				catch (Exception $e){
					try{
						self::$pdo = new PDO(sprintf("mysql:host=%s;dbname=%s",self::$mysqlServer,self::$mysqlDB), self::$mysqlUser, self::$mysqlPass);
					}
					catch (Exception $e){
						return FALSE;
					}
				}
			
			return TRUE;
		}
		
		/**
		 * Disconnect from MYSQL
		 */
		public static function mysqlDisconnect(){
			self::$pdo = NULL;
		}
		
		/**
		 * runs a query
		 * @param query - the query to run
		 * @param param - the parameters of the query. May be null
		 * @return - the query return
		 */
		public static function query($query, $param = null){
			if(!self::mysqlConnect())
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
		