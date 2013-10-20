<?php
/**
 *	Project name: InFood
 * 	Author: Jacob Liscom
 *	Version: 12.10.0
 * 
 * Handles the java script to php calls
**/

	include_once dirname(__FILE__)."/Authenticater.php";
			
	//check username availability 
		if(isset($_POST["checkAvailability"],$_POST["userName"]))
			Authenticater::checkAvailability($_POST["userName"]);
		
	//register  
		if(isset($_POST["register"],$_POST["userName"],$_POST["password"]))
			Authenticater::register($_POST["userName"],$_POST["password"]);
		
	//login  
		if(isset($_POST["login"],$_POST["userName"],$_POST["password"]))
			Authenticater::login($_POST["userName"],$_POST["password"]);
?>	