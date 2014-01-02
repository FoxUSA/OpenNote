<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 12.10.0
 * 
 * Handles the java script to php calls
**/
	include_once dirname(__FILE__)."/Config.php";
	include_once dirname(__FILE__).LoginConfig::getCommonPath();
			
	//check username availability 
		if(isset($_POST["checkAvailability"],$_POST["userName"]))
			Authenticater::checkAvailability($_POST["userName"]);
		
	//register  
		if(Config::$registrationEnabled&&isset($_POST["register"],$_POST["userName"],$_POST["password"]))//dont allow them to execute this call if it is disabled
			Authenticater::register($_POST["userName"],$_POST["password"]);
		
	//login  
		if(isset($_POST["login"],$_POST["userName"],$_POST["password"]))
			Authenticater::login($_POST["userName"],$_POST["password"]);
?>	