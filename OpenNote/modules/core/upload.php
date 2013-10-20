<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.10.0
**/
	$url =  "./upload/".time()."_".$_FILES["upload"]["name"];
	 //extensive suitability check before doing anything with the file...
	    if (($_FILES["upload"] == "none") OR (empty($_FILES["upload"]["name"])))
	       $message = "No file uploaded.";
			
	    else 
	    	if ($_FILES["upload"]["size"] == 0)
	      		$message = "The file is of zero length.";
	    
	    	else 
		    	if (!is_uploaded_file($_FILES["upload"]["tmp_name"]))
		       		$message = "You may be attempting to hack our server. We're on to you; expect a knock on the door sometime soon.";
	    
			    else {
			      	$message = "";
					
			      	$move = move_uploaded_file($_FILES["upload"]["tmp_name"], "../.".$url);//alter the url to support this relative path

			      	if(!$move)
			         	$message ="Error moving uploaded file. Check the script is granted Read/Write/Modify permissions.";
			  		
	    		}
	 
	$funcNum = $_GET["CKEditorFuncNum"];
	echo "<script type\"text/javascript\">window.parent.CKEDITOR.tools.callFunction($funcNum, \"$url\", \"$message\");</script>";
?>