<?php
	//require_once 'PHPUnit/Framework.php';
	//include_once dirname(__FILE__)."/../phpunit.phar";
	//include_once dirname(__FILE__)."/../PHPUnit/Autoload.php";
	include_once dirname(__FILE__)."/../../TestingConfig.php";
	include_once TestingConfig::getOpenNoteLoc()."controller/NoteBook.php";
	include_once TestingConfig::getOpenNoteLoc()."model/interfaces/IModel.php";
	include_once TestingConfig::getOpenNoteLoc()."model/Model.php";
	
	class NoteBookTest extends PHPUnit_Framework_TestCase{
		
		/**
		 * Test Root Note Book
		 */
		public function testNoteBookRoot(){
			//setup
				$folderID = null;
				$name = rand(0, 999999999)."Folder123";
				$return = array(array("id"=>rand(0, 999999999),"name"=>$name));
						
				$this->expectOutputRegex("{}"); //make sure the js call is made//TODO
		        $model = $this->getMock("Model", array("getRootFolder"));
								
			 	$model->expects($this->once())//This is call called when a new NoteBook is created
		                 ->method("getRootFolder")
		                 ->will($this->returnValue($return));
					 
			new NoteBook($model,$folderID);
		}
		
		/**
		 * Test Root Note Book
		 */
		public function testNoteBookSub(){
			//setup
				$folderID = rand(0, 999999999);
				$name = rand(0, 999999999)."Folder123"; 
				$return = array(array("id"=>rand(0, 999999999),"name"=>$name));
						
				$this->expectOutputRegex("{}"); //make sure the js call is made//TODO
		        $model = $this->getMock("Model", array("getFolder"));
								
			 	$model->expects($this->once())//This is call called when a new NoteBook is created
		                 ->method("getFolder")
		                 ->with($this->equalTo($folderID));
					 
			new NoteBook($model,$folderID);
		}
		
		/**
		 * test both new sub folder
		 */
		public function testNewSubFolder(){
			//Setup
				$parrentID = rand(0, 999999999);
				$name = rand(0, 999999999)."Folder123"; //parent folder simulatedID
						
				$this->expectOutputRegex("{getFolderList()}"); //make sure the js call is made
		        $model = $this->getMock("Model", array("newFolder","getFolder"));
		 
		        $model->expects($this->once())
		                 ->method("newFolder")
		                 ->with($this->equalTo($parrentID))
						 ->will($this->returnValue($name));
								
			 	$model->expects($this->once())//This is call called when a new NoteBook is created
		                 ->method("getFolder")
		                 ->with($this->equalTo($parrentID));
						 
				$result=NoteBook::newFolder($model,$parrentID,$name);
				$this->assertEquals($result, "");//No output expected
		}
		
		/**
		 * test both new root folder
		 */
		public function testNewRootFolder(){
			//Setup
				$parrentID = null;
				$name = rand(0, 999999999)."Folder123"; //parent folder simulatedID
						
				$this->expectOutputRegex("{getFolderList()}"); //make sure the js call is made
		        $model = $this->getMock("Model", array("newFolder","getRootFolder"));
		 
		        $model->expects($this->once())
		                 ->method("newFolder")
		                 ->with($this->equalTo($parrentID))
						 ->will($this->returnValue($name));
								
			 	$model->expects($this->once())//This is call called when a new NoteBook is created
		                 ->method("getRootFolder")
		                 ->will($this->returnValue(array(array("id"=>rand(0, 999999999),"name"=>$name))));
						 
				$result=NoteBook::newFolder($model,$parrentID,$name);
				$this->assertEquals($result, "");//No output expected
		}
		
		public function testRemoveFolder(){
			//Setup
				$id = rand(0, 999999999);
				$return = rand(0, 999999999); //parent folder simulatedID
						
				$this->expectOutputRegex("{getFolderList()}"); //make sure the js call is made
		        $model = $this->getMock("Model", array("removeFolder","getFolder"));
		 
		        $model->expects($this->once())
		                 ->method("removeFolder")
		                 ->with($this->equalTo($id))
						 ->will($this->returnValue($return));
								
			 	$model->expects($this->once())//This is call called when a new NoteBook is created
		                 ->method("getFolder")
		                 ->with($this->equalTo($return));
	 
	        $result = NoteBook::removeFolder($model, $id); //test code
			
			$this->assertEquals($result, "");//No output expected
		}
		
		/**
		 * Tests if the move folder calls model
		 */
		public function testMoveFolder(){
			$newParrentID = rand(0, 999999999);
			$folderD = rand(0, 999999999);
			
	        $model = $this->getMock("Model", array("moveFolder"));
	 
	        $model->expects($this->once())
	                 ->method("moveFolder")
	                 ->with($this->equalTo($newParrentID),
					 		$this->equalTo($folderD));
	 
	        $result = NoteBook::moveFolder($model, $folderD, $newParrentID);
			
			$this->assertEquals($result, "");//No output expected
		}
		
		/**
		 * Test the renameFolder method.
		 * chec for jsoutput and model calls
		 */
		public function testRenameFolder(){
			$title = "Folder!@#";
			$id = rand(0, 999999999);
			
			$this->expectOutputRegex("{getFolderList()}"); //make sure the js call is made
	        $model = $this->getMock("Model", array("renameFolder","getFolder"));//create mock for model.renameFolder
	 
	        // Set up the expectation for the renameFolder() method
	        // to be called only once and with the string $title and $ID
	        // as its parameter.
	        $model->expects($this->once())
	                 ->method("renameFolder")
	                 ->with($this->equalTo($id),
					 		$this->equalTo($title));
							
		 	$model->expects($this->once())
	                 ->method("getFolder")
	                 ->with($this->equalTo($id));
	 
	        $result = NoteBook::renameFolder($model, $id, $title);
			
			$this->assertEquals($result, "");//No output expected
		}
	}
?>