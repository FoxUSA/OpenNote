<?php
	include_once dirname(__FILE__)."/../../TestingConfig.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteEditor.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteBook.php";
	include_once TestingConfig::getOpenNoteLoc()."model/interfaces/IModel.php";
	include_once TestingConfig::getOpenNoteLoc()."model/Model.php";
	include_once TestingConfig::getOpenNoteLoc()."model/Note.php";
	
	class commonTests extends PHPUnit_Framework_TestCase{
		
		public function testPostSpecialCharStrip(){
			
		}
	}
?>