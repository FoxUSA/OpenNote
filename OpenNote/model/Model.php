<?php
	include_once dirname(__FILE__)."/../controller/Common.php";
	
	abstract class Model{
		
		/**
		 * Permanently deletes the note from the db
		 * @param noteID- the note ID to delete
		 * @return - the folderID the note was in
		 */
		public static function removeNote($noteID){
			$originID=null;		
				if($noteID!=null){//figure out the orign note
					$origin = Core::query("SELECT originNoteID, folderID FROM note WHERE id = ? AND userID=?;",array($noteID, Authenticater::getUserID())); //retrieve the parrent
				
					if(count($origin)==0)
						return; //no results
						
					if($origin[0]["originNoteID"]!=null)//is this an orign note?
						$originID=$origin[0]["originNoteID"];
					else 
						$originID=$noteID; //was origin
				}
				
				Core::query("DELETE FROM note WHERE originNoteID=? AND userID=?;",array($originID, Authenticater::getUserID()));//delete the history
				Core::query("DELETE FROM note WHERE id=? AND userID = ?;",array($originID, Authenticater::getUserID()));//delete the origin note
			return $origin[0]["folderID"];
		}
		
		/**
		 * @param note - the note to save
		 * @return - the id of the saved note
		 */
		public static function saveNote(Note $note){
			$originID=null;		
			if($note->id!=null){//figure out the orign note
				$origin = Core::query("SELECT originNoteID FROM note WHERE id = ? AND userID = ?;",array($note->id, Authenticater::getUserID())); //retrieve the parrent
			
				if(count($origin)==0)
					return; //no results
					
				if($origin[0]["originNoteID"]!=null)//is this an origin note?
					$originID=$origin[0]["originNoteID"];
				else 
					$originID=$note->id; //was origin
			}
			
			Core::query("INSERT INTO note (folderID, originNoteID,title,note,userID) VALUES(?,?,?,?,?);",
				array($note->folderID,$originID,$note->title,$note->note, Authenticater::getUserID()));//parse out for mysql use
				
			return Core::getInsertID();
		}
		
		/**
		 * @param folderID - the note the foder is in
		 * @param id - the id of the note to get
		 */
		public static function getNote($folderID, $id){
			$result = Core::query("SELECT title, note, originNoteID FROM note WHERE id = ? AND userID=?;",array($id,Authenticater::getUserID()));//get the note
			if(count($result)==1){
				$note = new Note();
				$note->folderID=$folderID;
				$note->id=$id;
				$note->title=$result[0]["title"];
				$note->note=html_entity_decode($result[0]["note"]);//de-scape note
				$note->originNoteID=$result[0]["originNoteID"];
				
				return $note;
			}
			else
				throw new Exception("Note Note Found");
		}
		
		/**
		 * change a folders parrent
		 * @param folderID - the folder id to change the parrent of
		 * @param newParrentID - the new parrent of the folder
		 */
		public static function moveFolder($newParrentID,$folderID){
			Core::query("UPDATE folder SET parrentFolderID = ? WHERE id=? AND userID=?;",array($newParrentID,$folderID,Authenticater::getUserID()));
		}
		
		/**
		 * delete a new folder
		 * @param $folderID - the id of the folder to delete.
		 */
		public static function removeFolder($folderID){
			$parrent = Core::query("SELECT parrentFolderID, name, userID FROM folder WHERE id=? AND userID=?;",array($folderID,Authenticater::getUserID()));
			Core::query("DELETE FROM folder WHERE id=? AND userID=?;",array($folderID,Authenticater::getUserID()));
			
			return $parrent[0]["parrentFolderID"];
		}
		
		/**
		 * creates a new folder
		 * @param parrentID - the id of the parent folder.
		 * @param name - the title of folder
		 */
		public static function newFolder($parentID,$name){
			Core::query("INSERT INTO folder(parrentFolderID,name, userID) VALUES(?,?,?)",array($parentID,$name,Authenticater::getUserID()));
		}
		
		/**
		 * @return - the root folder list
		 */
		public static function getRootFolder(){
			 return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE parrentFolderID IS NULL AND userID=? ORDER BY name",array(Authenticater::getUserID()));
		}
		
		/**
		 * @param folderID - the folder get
		 * @return - the folder content
		 */
		public static function getFolder($folderID){
			return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE id = ? AND userID=? ORDER BY name",array($folderID, Authenticater::getUserID()));
		}
		 
		/**
		 * @param folderID - the folder to get the childen of
		 * @return - the sub folders
		 */
		public static function getSubFolders($folderID){
	  		return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE parrentFolderID = ? AND userID=? ORDER BY name", array($folderID,Authenticater::getUserID()));
		}
		 
		/**
		 * @param folderID - the folder to get the notes from
		 * @return - the notes from the folder
		 */ 
		public static function getNotesInFolder($folderID){
			return		 Core::query("SELECT n.id, n.title 
									FROM note n 
									WHERE 	n.folderID = ? 
										AND (n.originNoteID IS NULL OR n.id IN (SELECT MAX(id) FROM note WHERE originNoteID=n.originNoteID)) 
										AND (SELECT COUNT(*) FROM note WHERE originNoteID = n.id)=0
										AND userID=?
									ORDER BY n.title", 
									array($folderID,Authenticater::getUserID()));//basically get notes that id is null and have not been overwritten or are the latest
		}
		
		/**
		 * @param search - the string to use to search
		 * @return - the folders that match the search
		 */
		public static function searchFolders($search){
			return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE name LIKE ? AND userID=? ORDER BY name",array(sprintf("%%%s%%",$search), Authenticater::getUserID()));
		}
		
		/**
		* @param search - the string to use to search
		* @return - the notes that match the search
		*/
		public static function searchNotes($search){
		 	return 		Core::query("SELECT n.id, n.title, n.folderID 
									FROM note n 
									WHERE 	(title LIKE ? OR note LIKE ?)
										AND (n.originNoteID IS NULL OR n.id IN (SELECT MAX(id) FROM note WHERE originNoteID=n.originNoteID)) 
										AND (SELECT COUNT(*) FROM note WHERE originNoteID = n.id)=0
										AND userID=?
									ORDER BY n.title", 
									array(sprintf("%%%s%%",$search),sprintf("%%%s%%",$search),Authenticater::getUserID()));
		}
		
		/**
		 * @param originalName - the original name and type
		 * @param diskName - the name of the file we stored
		 * @return - the id of the inserted record
		 */ 
		public static function uploadFile($originalName, $diskName){
			Core::query("INSERT INTO uploads(originalName, diskName, userID) VALUES(?,?,?)",array($originalName,$diskName, Authenticater::getUserID()));
			return Core::getInsertID();
		}
		
		/**
		 * @param id - the id of the file to get
		 * @return  - the upload record to get
		 */ 
		public static function getUploadFile($id){
			return Core::query("SELECT originalName, diskName, userID FROM uploads WHERE id=? AND userID = ?",array($id, Authenticater::getUserID()));
		}
	}
	
?>