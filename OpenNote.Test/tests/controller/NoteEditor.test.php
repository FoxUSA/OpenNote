<?php
	include_once dirname(__FILE__)."/../../TestingConfig.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteEditor.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteBook.php";
	include_once TestingConfig::getOpenNoteLoc()."model/interfaces/IModel.php";
	include_once TestingConfig::getOpenNoteLoc()."model/Model.php";
	include_once TestingConfig::getOpenNoteLoc()."model/Note.php";
	
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
		
		/**
		 * test saving a note
		 */
		public function testSaveNote(){
			//Arrange
				$note = new Note();
					$note->id= rand(0, 999999999);
					$note->folderID= rand(0, 999999999);
					$note->originNoteID= rand(0, 999999999);
					$note->title= sprintf("%d Title",rand(0, 999999999));
					$note->note= sprintf("%d notes are fun yes they are. testins fun",rand(0, 999999999));
				
				$returnNote = new Note();
					$returnNote->id= rand(0, 999999999);
					$returnNote->folderID= $note->folderID;
					$returnNote->originNoteID= $note->originNoteID;
					$returnNote->title= sprintf("%d Title",rand(0, 999999999));
					$returnNote->note= sprintf("%d notes are fun yes they are. testing fun",rand(0, 999999999));
				
			
						
		        $model = $this->getMock("Model", array("saveNote","getNote"));
		 
		        $model->expects($this->once())
		                 ->method("saveNote")
		                 ->with($this->equalTo($note))
						 ->will($this->returnValue($returnNote->id));
						 
				$model->expects($this->once())
		                 ->method("getNote")
		                 ->with($this->equalTo($note->folderID),
						 		$this->equalTo($returnNote->id))
						 ->will($this->returnValue($returnNote));
						 
			//Assert1
				$this->expectOutputRegex(sprintf("((setButton0((.|\n)*)setButton1((.|\n)*)setButton2((.|\n)*)%s)?)",
												sprintf(	"setURL\(\"index\.php\?%s\",\"%s\"\)",
															sprintf("folderID=%d&noteID=%d",
																$returnNote->folderID,
																$returnNote->id),
															$returnNote->title)));//Make sure the JS output calls the correct display functions
			
			//Act
				$result = NoteEditor::save($model,$note);
			
			//Assert2
				$this->assertEquals($result, "");//No output expected
		}

		/**
		 * test new Note
		 */
		public function testNewNote(){
			//Arrange
				$folderID=rand(0, 999999999);		
		        $model = $this->getMock("Model", array("getNote"));
			
			//Assert		
				$this->expectOutputRegex(sprintf("((setButton0((.|\n)*)setButton1((.|\n)*)setButton2((.|\n)*)%s)?)",
												sprintf("<div id=\"note\" folderID=%d>",$folderID)));//Make sure the JS output calls the correct display functions
			
			//Act
				new NoteEditor($model,$folderID);
		}
		
		/**
		 * test existing note
		 */
		public function testExistingNote(){
			//Arrange				
				$returnNote = new Note();
					$returnNote->id= rand(0, 999999999);
					$returnNote->folderID= rand(0, 999999999);
					$returnNote->originNoteID;
					$returnNote->title= sprintf("%d Title",rand(0, 999999999));
					$returnNote->note= sprintf("%d notes are fun yes they are. testing fun",rand(0, 999999999));
			
						
		        $model = $this->getMock("Model", array("getNote"));

				$model->expects($this->once())
		                 ->method("getNote")
		                 ->with($this->equalTo($returnNote->folderID),
						 		$this->equalTo($returnNote->id))
						 ->will($this->returnValue($returnNote));
						 
			//Assert1
				$this->expectOutputRegex(sprintf("((setButton0((.|\n)*)setButton1((.|\n)*)setButton2((.|\n)*)%s)?)",
												sprintf(	"setURL\(\"index\.php\?%s\",\"%s\"\)",
															sprintf("folderID=%d&noteID=%d",
																$returnNote->folderID,
																$returnNote->id),
															$returnNote->title)));//Make sure the JS output calls the correct display functions
			
			//Act
				new NoteEditor($model,$returnNote->folderID,$returnNote->id);
		}

		/**
		 * test existing note not found exception
		 */
		public function testExistingNoteNotFoundException(){
			//Arrange				
				$returnNote = new Note();
					$returnNote->id= rand(0, 999999999);
					$returnNote->folderID= rand(0, 999999999);
					$returnNote->originNoteID;
					$returnNote->title= sprintf("%d Title",rand(0, 999999999));
					$returnNote->note= sprintf("%d notes are fun yes they are. testing fun",rand(0, 999999999));
			
						
		        $model = $this->getMock("Model", array("getNote"));

				$model->expects($this->once())
		                 ->method("getNote")
		                 ->with($this->equalTo($returnNote->folderID),
						 		$this->equalTo($returnNote->id))
						 ->will($this->returnValue(null));
						 
			//Assert1
				$this->expectOutputRegex("((Note Not Found)?)");//Make sure the JS output calls the correct display functions
			
			//Act
				new NoteEditor($model,$returnNote->folderID,$returnNote->id);
		}
	}
?>