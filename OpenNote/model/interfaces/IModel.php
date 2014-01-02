<?php
	include_once dirname(__FILE__)."/../../controller/common.php";
	
	interface IModel{
		
		/**
		 * Permanently deletes the note from the db
		 * @param noteID- the note ID to delete
		 * @return - the folderID the note was in
		 */
		public function removeNote($noteID);
		
		/**
		 * @param note - the note to save
		 * @return - the id of the saved note
		 */
		public function saveNote(Note $note);
		
		/**
		 * @param folderID - the note the folder is in
		 * @param id - the id of the note to get
		 */
		public function getNote($folderID, $id);
		
		/**
		 * change a notes folder
		 * @param noteID - the note id to change the parent of
		 * @param newFolderID - the new parent of the folder
		 */
		public function moveNote($noteID,$newFolderID);
		
		/**
		 * change a folders parent
		 * @param folderID - the folder id to change the parent of
		 * @param newParrentID - the new parent of the folder
		 */
		public function moveFolder($newParrentID=null,$folderID);
		
		/**
		 * delete a new folder
		 * @param $folderID - the id of the folder to delete.
		 */
		public function removeFolder($folderID);
		
		/**
		 * Rename Folder
		 * @param $folderID - the id of the folder to rename.
		 * @param title - the new title of the folder
		 */
		public function renameFolder($folderID, $title);
		
		/**
		 * creates a new folder
		 * @param parrentID - the id of the parent folder.
		 * @param name - the title of folder
		 */
		public function newFolder($parentID,$name);
		
		/**
		 * @return - the root folder list
		 */
		public function getRootFolder();
		
		/**
		 * @param folderID - the folder get
		 * @return - the folder content
		 */
		public function getFolder($folderID);
		 
		/**
		 * @param folderID - the folder to get the childen of
		 * @return - the sub folders
		 */
		public function getSubFolders($folderID);
		 
		/**
		 * @param folderID - the folder to get the notes from
		 * @return - the notes from the folder
		 */ 
		public function getNotesInFolder($folderID);
		
		/**
		 * @param search - the string to use to search
		 * @return - the folders that match the search
		 */
		public function searchFolders($search);
		
		/**
		* @param search - the string to use to search
		* @return - the notes that match the search
		*/
		public function searchNotes($search);
		
		/**
		 * @param originalName - the original name and type
		 * @param diskName - the name of the file we stored
		 * @return - the id of the inserted record
		 */ 
		public function uploadFile($originalName, $diskName);
		
		/**
		 * @param id - the id of the file to get
		 * @return  - the upload record to get
		 */ 
		public function getUploadFile($id);
	}	
?>