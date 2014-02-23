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
			include_once dirname(__FILE__)."/NoteBook.php";
			include_once dirname(__FILE__)."/NoteEditor.php";
			include_once dirname(__FILE__)."/../ajax.php";
			include_once dirname(__FILE__)."/../model/interfaces/IModel.php";
			include_once dirname(__FILE__)."/../model/Model.php";		
				include_once dirname(__FILE__)."/../model/Note.php";		
				include_once dirname(__FILE__)."/../model/Folder.php";		
			include_once dirname(__FILE__)."/Util.php";
				
			//clean inputs to prevent injection
				Util::cleanPost();
				Util::cleanGets();
			
			
	}

?>
		