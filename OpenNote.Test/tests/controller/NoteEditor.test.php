<?php
	include_once dirname(__FILE__)."/../../TestingConfig.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteEditor.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteBook.php";
	include_once TestingConfig::getOpenNoteLoc()."model/interfaces/IModel.php";
	include_once TestingConfig::getOpenNoteLoc()."model/Model.php";
	
	class NoteEditorTest extends PHPUnit_Framework_TestCase{
		
		/**
		 * test removing a note
		 */
		public function testRemoveNote(){
			//setup
				$parrentID = rand(0, 999999999);
				$noteID = rand(0, 999999999);
				
		        $model = $this->getMock("Model", array("removeNote", "getFolder"));
			        $model->expects($this->once())
			                 ->method("removeNote")
			                 ->with($this->equalTo($noteID))
							 ->will($this->returnValue($parrentID));	
							 
					$model->expects($this->once())//This is call called when a new NoteBook is created
				                 ->method("getFolder")
				                 ->with($this->equalTo($parrentID));

			$result = NoteEditor::remove($model,$noteID);
			$this->assertEquals($result, "");//No output expected
		}
		
		/**
		 * test moving a note
		 */
		public function testMoveNote(){
			//setup
				$newParrentID = rand(0, 999999999);
				$noteID = rand(0, 999999999);
				
		        $model = $this->getMock("Model", array("moveNote"));
		 
		        $model->expects($this->once())
		                 ->method("moveNote")
		                 ->with($this->equalTo($noteID),
						 		$this->equalTo($newParrentID));
			
			$result = NoteEditor::moveNote($model,$noteID, $newParrentID);
			$this->assertEquals($result, "");//No output expected
		}
	}
?>