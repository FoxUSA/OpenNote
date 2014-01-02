<?php
	include_once dirname(__FILE__)."/../controller/common.php";
	
	class Model implements IModel{
		
		/**
		 * Permanently deletes the note from the db
		 * @param noteID- the note ID to delete
		 * @return - the folderID the note was in
		 */
		public function removeNote($noteID){
			$originID=null;		
				if($noteID==null||!$this->doesUserOwnNote($noteID))//do not go on if note is null or they do not own the note
					throw new Exception("User cannot edit this note");
				
				$originID=$this->getOriginNote($noteID);
				$folderID=$this->getNotesFolderID($noteID);
				
				Core::query("DELETE FROM note WHERE originNoteID=? AND userID=?;",array($originID, Authenticater::getUserID()));//delete the history
				Core::query("DELETE FROM note WHERE id=? AND userID = ?;",array($originID, Authenticater::getUserID()));//delete the origin note
			return $folderID;
		}
		
		/**
		 * @param note - the note to save
		 * @return - the id of the saved note
		 */
		public function saveNote(Note $note){
			$originID=null;		
			if($note->id!=null){//is this new or exsisting//if new go on
				if(!$this->doesUserOwnNote($note->id))
					throw new Exception("User cannot edit this note");

				$originID=$this->getOriginNote($note->id);
			}

			
			Core::query("INSERT INTO note (folderID, originNoteID,title,note,userID) VALUES(?,?,?,?,?);",
				array($note->folderID,$originID,$note->title,$note->note, Authenticater::getUserID()));//parse out for mysql use
				
			return Core::getInsertID();
		}
		
		/**
		 * @param folderID - the note the folder is in
		 * @param id - the id of the note to get
		 */
		public function getNote($folderID, $id){
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
		 * change a notes folder
		 * @param noteID - the note id to change the parent of
		 * @param newFolderID - the new parent of the folder
		 */
		public function moveNote($noteID,$newFolderID){
			
			if($noteID==null||!$this->doesUserOwnNote($noteID)||$newFolderID==null||!$this->doesUserOwnFolder($newFolderID))//if any true dont move on
				return;
			
			$originID=$this->getOriginNote($noteID);			
		
			Core::query("UPDATE note SET folderID = ? WHERE originNoteID = ?  AND userID=?;",array($newFolderID,$originID,Authenticater::getUserID()));//update history
			Core::query("UPDATE note SET folderID = ? WHERE id=?  AND userID=?;",array($newFolderID,$originID,Authenticater::getUserID()));//update original
		}
		
		/**
		 * change a folders parent
		 * @param folderID - the folder id to change the parent of
		 * @param newParrentID - the new parent of the folder
		 */
		public function moveFolder($newParrentID=null,$folderID){
			if($newParrentID!=null && !$this->doesUserOwnFolder($newParrentID))//folders can be null here
				return;
			
			Core::query("UPDATE folder SET parrentFolderID = ? WHERE id=? AND userID=?;",array($newParrentID,$folderID,Authenticater::getUserID()));
		}
		
		/**
		 * delete a new folder
		 * @param $folderID - the id of the folder to delete.
		 */
		public function removeFolder($folderID){
			$parrent = Core::query("SELECT parrentFolderID, name, userID FROM folder WHERE id=? AND userID=?;",array($folderID,Authenticater::getUserID()));
			Core::query("DELETE FROM folder WHERE id=? AND userID=?;",array($folderID,Authenticater::getUserID()));
			
			return $parrent[0]["parrentFolderID"];
		}
		
		/**
		 * Rename Folder
		 * @param $folderID - the id of the folder to rename.
		 * @param title - the new title of the folder
		 */
		public function renameFolder($folderID, $title){
			Core::query("UPDATE folder SET name = ? WHERE id=? AND userID=?;",array($title,$folderID,Authenticater::getUserID()));
		}
		
		/**
		 * creates a new folder
		 * @param parrentID - the id of the parent folder.
		 * @param name - the title of folder
		 */
		public function newFolder($parentID,$name){
			Core::query("INSERT INTO folder(parrentFolderID,name, userID) VALUES(?,?,?)",array($parentID,$name,Authenticater::getUserID()));
		}
		
		/**
		 * @return - the root folder list
		 */
		public function getRootFolder(){
			 return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE parrentFolderID IS NULL AND userID=? ORDER BY name",array(Authenticater::getUserID()));
		}
		
		/**
		 * @param folderID - the folder get
		 * @return - the folder content
		 */
		public function getFolder($folderID){
			return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE id = ? AND userID=? ORDER BY name",array($folderID, Authenticater::getUserID()));
		}
		 
		/**
		 * @param folderID - the folder to get the childen of
		 * @return - the sub folders
		 */
		public function getSubFolders($folderID){
	  		return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE parrentFolderID = ? AND userID=? ORDER BY name", array($folderID,Authenticater::getUserID()));
		}
		 
		/**
		 * @param folderID - the folder to get the notes from
		 * @return - the notes from the folder
		 */ 
		public function getNotesInFolder($folderID){
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
		public function searchFolders($search){
			return Core::query("SELECT id, parrentFolderID, name FROM folder WHERE name LIKE ? AND userID=? ORDER BY name",array(sprintf("%%%s%%",$search), Authenticater::getUserID()));
		}
		
		/**
		* @param search - the string to use to search
		* @return - the notes that match the search
		*/
		public function searchNotes($search){
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
		public function uploadFile($originalName, $diskName){
			Core::query("INSERT INTO uploads(originalName, diskName, userID) VALUES(?,?,?)",array($originalName,$diskName, Authenticater::getUserID()));
			return Core::getInsertID();
		}
		
		/**
		 * @param id - the id of the file to get
		 * @return  - the upload record to get
		 */ 
		public function getUploadFile($id){
			return Core::query("SELECT originalName, diskName, userID FROM uploads WHERE id=? AND userID = ?",array($id, Authenticater::getUserID()));
		}
		
		/**
		 * figure out the originNoteID from a noteID
		 * @param noteID - a note id to find the origin for
		 * @return - the origin note id
		 */
		private function getOriginNote($noteID){
			$origin = Core::query("SELECT originNoteID FROM note WHERE id = ? AND userID = ?;",array($noteID, Authenticater::getUserID())); //retrieve the parent
		
			if(count($origin)==0)
				throw new Exception("Could not find note");
				
			if($origin[0]["originNoteID"]!=null)//is this an origin note?
				$originID=$origin[0]["originNoteID"];
			else 
				$originID=$noteID; //was origin
				
			return $originID;
		}
		
		/**
		 * checks if the user owns the note
		 * @param noteID - the noteid to check and see if the user owns it
		 * @return - true if the user owns the note
		 */
		private function doesUserOwnNote($noteID){
			if($noteID==null)
				return TRUE;
				
			$note = Core::query("SELECT id FROM note WHERE id = ? AND userID = ?;",array($noteID, Authenticater::getUserID())); 
			return count($note)==1;
		}
		
		/**
		 * checks if the user owns the folder
		 * @param folderID - the folderID to check and see if the user owns
		 * @return - true if the user owns the folderID
		 */
		private function doesUserOwnFolder($folderID){
			if($folderID==null)//it can be null. If it isnt make sure we own the folder
				throw new Exception("doesUserOwnFolder function cannot accept a null folderID.");
				
			$ownsNewFolder=Core::query("SELECT id FROM folder WHERE id = ? AND userID = ?;",array($folderID, Authenticater::getUserID()));
				
			return count($ownsNewFolder)==1;
		}
		
		/**
		 * Get the folderID from the noteID
		 * @param noteID - get the folderID that noteID is in.
		 * @return - the folderID
		 */
		private function getNotesFolderID($noteID){
			$result = Core::query("SELECT folderID FROM note WHERE id = ? AND userID=?;",array($noteID,Authenticater::getUserID()));//get the note
			return $result[0]["folderID"];
		}

	}	
?>