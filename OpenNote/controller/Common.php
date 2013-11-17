<?php
ob_start (); //buffer output
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/
	include_once dirname(__FILE__)."/../Config.php";
	include_once dirname(__FILE__)."/modules/login/Authenticater.php";//this must be first due to security concerns
	
	//which db type do you want to use
		include_once dirname(__FILE__)."/modules/core/Mysql.php";

	//common includes 
		include_once dirname(__FILE__)."/../upload/Download.php";
		include_once dirname(__FILE__)."/./NoteBook.php";
		include_once dirname(__FILE__)."/./NoteEditor.php";
		include_once dirname(__FILE__)."/../ajax.php";
		include_once dirname(__FILE__)."/../model/Model.php";		
			include_once dirname(__FILE__)."/../model/Note.php";		
			include_once dirname(__FILE__)."/../model/Folder.php";		
			
			
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
?>
		