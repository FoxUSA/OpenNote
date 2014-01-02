<?php
ob_start (); //buffer output
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/
	if(!isset($testing)){ //if testing dont do anything
		include_once dirname(__FILE__)."/../Config.php";
		include_once dirname(__FILE__).Config::$loginModulePath;//this must be first after config due to security concerns
		
		//Core module
			include_once dirname(__FILE__)."/modules/core/PDO.php";
	
		//common includes 
			include_once dirname(__FILE__)."/../upload/Download.php";
			include_once dirname(__FILE__)."/./NoteBook.php";
			include_once dirname(__FILE__)."/./NoteEditor.php";
			include_once dirname(__FILE__)."/../ajax.php";
			include_once dirname(__FILE__)."/../model/interfaces/IModel.php";
			include_once dirname(__FILE__)."/../model/Model.php";		
				include_once dirname(__FILE__)."/../model/Note.php";		
				include_once dirname(__FILE__)."/../model/Folder.php";		
				
				
		//clean inputs to prevent sql injection
			foreach($_POST as $key => $val) {
				if(isset($_POST[$key])&&is_String($_POST[$key])){
					$_POST[$key] =   htmlentities($val);
					$key =   htmlentities($val);//escape characters
				}
			}; //in this app were we allow html code to sent to the back end
			
			foreach($_GET as $key => $val) {
				if(isset($_GET[$key]) && is_String($_GET[$key])){
					$_GET[$key] = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
					$key = stripslashes(strip_tags(htmlspecialchars($val, ENT_QUOTES)));
				}
			};
	}
?>
		