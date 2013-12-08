<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.11.0
**/
include_once dirname(__FILE__)."/../controller/common.php";

	class Download{
		public function Download(){
			$result = null;
			
			if(isset($_GET["uploadID"])) //get existing note 
				$result = Model::getUploadFile($_GET["uploadID"]);//syntax index.php?id=$id\"
			
			if(count($result)==0)
				return; //no results	
			
			$originalName = $result[0]["originalName"];
			$diskName = $result[0]["diskName"];
			
			if (file_exists($diskName)) {
				header("Content-Type: application/octet-stream");
				header(sprintf("Content-Disposition:  attachment; filename=\"%s\";",$originalName)); //let them know what we are sending
				header("Content-Transfer-Encoding:  binary");
				
				header(sprintf("Content-Length:  %d",filesize($diskName))); //and how big it is
				ob_clean();
				flush();
				readfile($diskName); //send it away
				exit;
			}
		}
		
		/**
		 * @return  - returns the full path name of this class relative to the web root
		 */
		public static function getPath(){			
			return str_replace("\\", "/",str_replace(realpath($_SERVER["DOCUMENT_ROOT"]),"",realpath(dirname(__FILE__))))."/Download.php";
		}
	}
	
	new Download();
?>