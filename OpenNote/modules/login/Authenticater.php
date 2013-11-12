<?php
include_once dirname(__FILE__).'/../core/Common.php';
Authenticater::sessionHeader(); //this page gets included as part of the include tree. This method will be called for every page

	abstract class Authenticater{
		
		/**
		 * @param userName - the user name to check availability for
		 */
		public static function checkAvailability($userName){

			if(self::validateUsername($userName)){
				echo "Invalid username";
				return;
			}

			global $ioc;
			$userRepository = $ioc->make('\OpenNote\Data\Repositories\UserRepository');
			if(count($userRepository->get(array(
				'username' => $userName
			))) == 0)
			{
				echo "*Available";
			}
			else
			{
				echo "*Not Available";
			}

		}
		
		/**
		 * register a user
		 * @param userName - the username to register
		 * @param password - the password fort the user
		 */
		public static function register($userName, $password){
			
			//Validate the username
			if(self::validateUsername($userName)){
				echo "Invalid username";
				return;
			}

			//Build an instance of a new user
			global $ioc;
			$userRepository = $ioc->make('\OpenNote\Data\Repositories\UserRepository');
			if(count($userRepository->get(array(
				'username' => $userName
			))) != 0)
			{
				echo "The username is taken. Please try something else.";
				return;
			}

			//Encrypt the password
			$password = crypt($password);

			//Persist the user
			$userBuilder = $ioc->make('\OpenNote\Data\Builders\UserBuilder');
			$newUser = $userBuilder->build(array(
				'id' => null,
				'username' => $userName,
				'password' => $password
			));
			$userRepository->create($newUser);
			
			//Port the user's id into the session storage
			$_SESSION["userID"] = $newUser->getId();
			echo "Thank You For Registering
				<script type=\"text/javascript\">
					document.location.href =\"../../\";
				</script>";

		}

		/**
		 * authenticate a user
		 * @param userName
		 * @param password
		 */
		public static function login($userName, $password){

			//Set default value of where to go after login
			if(!isset($_SESSION["reguestURL"]))
			{
				$_SESSION["reguestURL"]= "../../";	
			}
			
			//Check if user exists
			global $ioc;
			$userRepository = $ioc->make('\OpenNote\Data\Repositories\UserRepository');
			if(count($users = $userRepository->get(array(
				'username' => $userName
			))) != 1)
			{
				echo "Invalid Username or Password";
				return;
			}

			//Extract the user
			$user = reset($users);

			//Encrypt the password
			$password = crypt($password);

			//Validate the user password
			if($password != $user->getPassword())
			{
				echo "Invalid Username or Password";
				return;
			}

			//Port the user's id into the session storage
			$_SESSION["userID"] = $newUser->getId();
			
			//Redirect the user
			echo sprintf("	Credentials Accepted
								<script type=\"text/javascript\">
									document.location.href =\"%s\";
								</script>",
							$_SESSION["reguestURL"]); //of to the races

		}
		
		/**
		 * make sure the username is valid
		 * @param username - the username to validate
		 */
		private static function validateUsername($username) {
			return preg_match("/[^0-9a-z_]/i", $username);
		}
		
		/**
		 * @return  - returns the full path name of this class relative to the web root
		 */
		public static function getPath(){			
			return str_replace("\\", "/",str_replace(realpath($_SERVER["DOCUMENT_ROOT"]),"",realpath(dirname(__FILE__))))."/";
		}
		
		/**
		 * Session header.
		 * Should be the first thing on every page
		 */
		public static function sessionHeader(){
			if(session_id() == "")
				session_start(); //start the session if it hasn't been already
						
			$currentURL=$_SERVER["REQUEST_URI"];
			if(substr($currentURL,-1)!="/")
				$currentURL=dirname($currentURL)."/"; //get the directory of the file if it isnt a directory
			
			if(!isset($_SESSION["userID"])&&$currentURL!=Authenticater::getPath()){//are we logged in or are we on the login page?
				$_SESSION["reguestURL"]=$_SERVER["REQUEST_URI"]; //remember where we are so we can come back
				header(sprintf("Location: %s%s%s",self::supportsSSL(),$_SERVER["HTTP_HOST"],Authenticater::getPath())); //off to secure login
			}
		}
		
		/**
		 * @return - the userID for the logged in user
		 */
		public static function getUserID(){
			return $_SESSION["userID"];
		}
		
		/**
		 * see if the given id is the current user
		 * @param id - the id of the user to check
		 * @return - true if user matches
		 */
		public static function currentUser($id){
			return $id==Authenticater::getUserID();
		}
		
		/**
		 * @return - https if supported or http is not
		 */
		public static function supportsSSL(){
			$SSLCheck = null;
			$SSLCheck = @fsockopen($_SERVER["HTTP_HOST"], 443, $errno, $errstr, 30);
			
			if ($SSLCheck==null || !$SSL_Check){
				return "http://";
			}
		 	fclose($SSL_Check); 
			return "https://";
		}
	}
?>