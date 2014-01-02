<?php
	$testing = true;
	include_once TestingConfig::getOpenNoteLoc()."/controller/common.php";//include this to override the projects dependency drive
	
	abstract class TestingConfig{
		/**
		 * Checks to see if the OpenNote Project exists
		 * @return - returns the OpenNoteLocation
		 */
		public static function getOpenNoteLoc(){
			$openNoteLoc = dirname(__FILE__)."/../OpenNote/";
			if (file_exists($openNoteLoc))
				return $openNoteLoc;
			throw new Exception("OpenNote Project Not Found!");
		}
	}
?>	