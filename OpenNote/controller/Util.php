<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/
include_once dirname(__FILE__)."/common.php";

	abstract class Util{
		
		/**
		 * Clean post values by escaping special characters
		 */
		public static function cleanPost(){
			foreach($_POST as $key => $val) {
				if(isset($_POST[$key])&&is_String($_POST[$key])){
					$_POST[$key] =   htmlentities($val);
					$key =   htmlentities($val);//escape characters
				}
			}; //in this app were we allow html code to sent to the back end
		}
		
		/**
		 * Clean get values by escapting special characters
		 */
		public static function cleanGets(){
			foreach($_GET as $key => $val) {
				if(isset($_GET[$key]) && is_String($_GET[$key])){
					$_GET[$key] = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
					$key = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
				}
			};
		}
		
	}
?>
