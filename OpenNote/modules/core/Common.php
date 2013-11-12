<?php
ob_start (); //buffer output
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/

	//Include the vendor's autoloading library
	include_once(dirname(__FILE__).'/../../../vendor/autoload.php');

	//Continue with non psr-0 specific pre-loaded classes
	include_once dirname(__FILE__)."/../login/Authenticater.php";//this must be first
	include_once dirname(__FILE__)."/../../NoteBook.php";
	include_once dirname(__FILE__)."/../../NoteEditor.php";
	include_once dirname(__FILE__)."/../../ajax.php";	
	include_once dirname(__FILE__)."/./interfaces/ICore.php";

	//Setup the timezone
	date_default_timezone_set('America/Montreal');
	
	//clean inputs to prevent sql injection
		/*foreach($_POST as $key => $val) {
			if(isset($_POST[$key])&&is_String($_POST[$key])){
				$_POST[$key] = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
				$key = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
			}
		};*/ //in this app we allow html code to sent back
		
		foreach($_GET as $key => $val) {
			if(isset($_GET[$key]) && is_String($_GET[$key])){
				$_GET[$key] = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
				$key = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
			}
		};

	//Create an Inversion of Control Container
	global $ioc;
	$ioc = new \Illuminate\Container\Container();

	//Declaration of the core connectivity classe, will be replaced later with the repositories
	class Core implements ICore{
		//mysql connection info
			static $mysqlServer = "localhost";
			static $mysqlUser = "opennote";
			static $mysqlPass = "opennote";
			static $mysqlDB = "opennote";
			
		//PDO object
			private static $pdo;
		
		public function Core(){
			
		}
		
		/**
		 * Connect to MYSQL app DB
		 * @return - returns true if connected
		 */
		private static function mysqlConnect(){
			try{
				if(self::$pdo == NULL)
					self::$pdo = new PDO(sprintf("mysql:host=%s;dbname=%s",self::$mysqlServer,self::$mysqlDB), self::$mysqlUser, self::$mysqlPass);
	 			
				//ping equivalent
					try{
						self::$pdo->query("SELECT 1");
					}
					catch (Exception $e){
						self::$pdo = new PDO(sprintf("mysql:host=%s;dbname=%s",self::$mysqlServer,self::$mysqlDB), self::$mysqlUser, self::$mysqlPass);
					}
				}
			catch (Exception $e){
				return FALSE;
			}
			
			return TRUE;
		}
		
		/**
		 * Escape data using the pdo quote facilities
		 * @return Escape content
		 */
		private static function escape($data){
			if(!self::mysqlConnect())
				die ("Could not connect to sql server");

			return self::$pdo->quote($data);
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
			
			if(!$stmt->execute($param)){ //execute the statement	
				var_dump($stmt->errorInfo());
				die("The query did not work.");
			}
				
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
		