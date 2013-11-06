<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.2.0
**/

	include_once dirname(__FILE__)."/modules/core/Common.php";
	//OO code
		class NoteEditor{
			private static $NOTE_FOOT =	"</div>";
			/**
			 * Constructor 
			 * @param id - optional - the id of the note to open
			 */
			public function NoteEditor($folderID,$id=null){
				if($id!=null)
					$this->existingNote($folderID,$id);
				else
					$this->newNote($folderID);
			}
			
			/**
			 * Create a new item Class
			 */
			private function newNote($folderID){
				echo "	<script type=\"text/javascript\">
							setButton0(\"\");
						   	setButton1(\"Save\");
						   	setButton2(\"Clear\");
				   		</script>";
				
				echo "	<div id=\"noteTitle\">
							<input type=\"text\" class=\"inputField\" id=\"noteName\" value=\"Note Title\">
						</div>";	//no fade in here because this page is always called by a putton and cant be reached directly
						
				echo self::noteHead($folderID).self::$NOTE_FOOT;//hidden element to
						
				echo "	<script type=\"text/javascript\">
							CKEDITOR.replace(\"note\");
				   		</script>";
			}
			
			/**
			 * get a current note
			 * @param id - the not to get
			 */
			private function existingNote($folderID, $id){
				$result = Core::query("SELECT title, note, originNoteID FROM note WHERE id = ? AND userID=?;",array($id,Authenticater::getUserID()));//get the note
				if(count($result)==1){
					echo sprintf("	
							<div id=\"noteTitle\" class=\"startHidden\">
								<input type=\"text\" class=\"inputField\" id=\"noteName\" value=\"%s\" readonly>
								<button id=\"removeNote\" type=\"button\" class=\"right customButton\" noteID=\"$id\" hidden>
									X
								</button>
							</div>
							
							<script type=\"text/javascript\">
								$(\"#noteTitle\").fadeIn(fadeSpeedLong/2);
							</script>",$result[0]["title"]);//make sure speeds are the same in js. We have it in two places in case the page is loaded without clicking a note box.Case already on note page
					
						echo sprintf("
						<div class=\"box big startHidden\">%s %s %s</div>
						
						<script type=\"text/javascript\">
							$(\".big\").fadeIn(fadeSpeedLong/2);
						</script>
						", self::noteHead($folderID,$id), $result[0]["note"], self::$NOTE_FOOT);
						
					echo sprintf("<script type=\"text/javascript\">
									setButton0(\"\");
								   	setButton1(\"\");
								   	setButton2(\"Edit\");
								   	setURL(\"index.php?%s\",\"%s\");
							   	</script>","folderID=$folderID&noteID=$id", $result[0]["title"]);
				}
				Core::mysqlDisconnect();
			}
			
			/**
			 * @param parrentFolderID - the parent of the note
			 * @param $noteID - note to override can be null
			 * @param title - the title of the note
			 * @param note - the note body
			 */
			public static function save($folderID, $noteID=null, $title, $note){
				$originID=null;		
				if($noteID!=null){//figure out the orign note
					$origin = Core::query("SELECT originNoteID FROM note WHERE id = ? AND userID = ?;",array($noteID, Authenticater::getUserID())); //retrieve the parrent
				
					if(count($origin)==0)
						return; //no results
						
					if($origin[0]["originNoteID"]!=null)//is this an orign note?
						$originID=$origin[0]["originNoteID"];
					else 
						$originID=$noteID; //was origin
				}
				
				Core::query("INSERT INTO note (folderID, originNoteID,title,note,userID) VALUES(?,?,?,?,?);",
							array($folderID,$originID,$title,$note, Authenticater::getUserID()));//parse out for mysql use
				
				new NoteEditor($folderID,Core::getInsertID()); //display what we just saved
			}
			
			/**
			 * Permanently deletes the note from the db
 			 * @param noteID- the note ID to delete
			 */
			public static function remove($noteID){
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
				
				new NoteBook($origin[0]["folderID"]);
			}
			
			/**
			 * generate a note div header
			 * @param folderID - the id of the folder the note is in
			 * @param id - the note id to place un the header. Is optional
			 */
			private static function noteHead($folderID,$id=null){
				if($id==null)
					return "<div id=\"note\" folderID=$folderID>";
				else 
					return "<div id=\"note\" noteID=$id folderID=$folderID>";
				
			}
		}
?>
