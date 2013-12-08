<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.7.0
 * 
 * Handles the java script to php calls
**/

	include_once dirname(__FILE__)."/controller/common.php";
	
	
	//some default values for optional parameters
		if(!isset($_POST["noteID"]))
			$_POST["noteID"]=null;
		
		if(!isset($_POST["folderID"]))
			$_POST["folderID"]=null;
			
		if(!isset($_POST["newParrentID"]))
			$_POST["newParrentID"]=null;
		
	//save Note
		if(isset($_POST["saveNote"],$_POST["folderID"],$_POST["title"],$_POST["note"])){
			$note = new Note();
			$note->folderID=$_POST["folderID"];
			$note->id=$_POST["noteID"];
			$note->title=$_POST["title"];
			$note->note=$_POST["note"];
			
			NoteEditor::save($note);
		}
		
	//New note
		if(isset($_POST["newNote"],$_POST["folderID"]))
			new NoteEditor($_POST["folderID"]);
		
	//Remove Note
		if(isset($_POST["removeNote"],$_POST["noteID"]))
			NoteEditor::remove($_POST["noteID"]);
		
	//load a note
		if(isset($_POST["loadNote"],$_POST["folderID"],$_POST["noteID"]))
			new NoteEditor($_POST["folderID"],$_POST["noteID"]);
		
	//Move Note
		if(isset($_POST["moveNote"],$_POST["noteID"],$_POST["newParrentID"]))
			NoteEditor::moveNote($_POST["noteID"],$_POST["newParrentID"]);
	
	//Load a folder
		if(isset($_POST["loadFolder"]))
			new NoteBook($_POST["folderID"]);
		
	//New folder
		if(isset($_POST["newFolder"],$_POST["name"]))
			NoteBook::newFolder($_POST["folderID"],$_POST["name"]);
		
	//Remove folder
		if(isset($_POST["removeFolder"],$_POST["folderID"]))
			NoteBook::removeFolder($_POST["folderID"]);
		
	//Rename folder
		if(isset($_POST["renameFolder"],$_POST["folderID"],$_POST["name"]))
			NoteBook::renameFolder($_POST["folderID"],$_POST["name"]);
	
	//Move folder
		if(isset($_POST["moveFolder"],$_POST["folderID"]))
			NoteBook::moveFolder($_POST["folderID"],$_POST["newParrentID"]);
		
	//Get folder List
		if(isset($_POST["getFolderList"]))
			NoteBook::getFolderList();
		
	//Search
		if(isset($_POST["search"],$_POST["searchString"]))
			NoteBook::search($_POST["searchString"]);
?>	