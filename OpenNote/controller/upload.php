<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.11.0
**/
	include_once dirname(__FILE__)."/common.php";
	 
	if(Config::$uploadEnabled){
		$diskName = sprintf("%s_%d",time(),rand());//the name we are going to store it under
		$originalName = $_FILES["upload"]["name"];//the name they sent us
		
		$url = sprintf("http://%s%s?uploadID=",$_SERVER["SERVER_NAME"], Download::getPath(),$diskName); //fancy way to get the Download.php path without a config
		$localPath = sprintf("../upload/%s",$diskName);
		
		$message="";
		
		 //extensive suitability check before doing anything with the file...
		    if (($_FILES["upload"] == "none") OR (empty($_FILES["upload"]["name"])))
		       $message = "No file uploaded. Try checking the php upload and post limit.";
				
		    else 
		    	if ($_FILES["upload"]["size"] == 0)
		      		$message = "The file is of zero length.";
		    
		    	else 
			    	if (!is_uploaded_file($_FILES["upload"]["tmp_name"]))
			       		$message = "You may be attempting to hack our server. We're on to you; expect a knock on the door sometime soon.";
		    
				    else {
				      	$message = "";
						
				      	$move = move_uploaded_file($_FILES["upload"]["tmp_name"], $localPath);//alter the url to support this relative path
	
				      	if(!$move)
				         	$message ="Error moving uploaded file. Check the script is granted Read/Write/Modify permissions.";
						
						if($message=="")
							$url =$url.Model::uploadFile($originalName, $diskName);
		    		}
		 
		$funcNum = $_GET["CKEditorFuncNum"];
		echo "<script type\"text/javascript\">window.parent.CKEDITOR.tools.callFunction($funcNum, \"$url\", \"$message\");</script>";
	}
?>