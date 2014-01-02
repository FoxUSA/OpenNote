<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.2.0
**/

	include_once dirname(__FILE__)."/common.php";
	//OO code
		class NoteEditor{
			private static $NOTE_FOOT =	"</div>";
			/**
			 * Constructor 
			 * @param id - optional - the id of the note to open
			 */
			public function NoteEditor(IModel $model, $folderID, $id=null){
				if($id!=null)
					$this->existingNote($model, $folderID, $id);
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
			private function existingNote(IModel $model, $folderID, $id){
				try{
					$note = $model->getNote($folderID, $id);
	
					echo sprintf("	
						<div id=\"noteTitle\" class=\"startHidden\">
							<input type=\"text\" class=\"inputField\" id=\"noteName\" value=\"%s\" readonly>
							<button id=\"removeNote\" type=\"button\" class=\"right customButton\" noteID=\"$id\" hidden>
								X
							</button>
						</div>
						
						<script type=\"text/javascript\">
							$(\"#noteTitle\").fadeIn(fadeSpeedLong/2);
						</script>",$note->title);//make sure speeds are the same in js. We have it in two places in case the page is loaded without clicking a note box.Case already on note page
					
					echo sprintf("
						<div class=\"box big startHidden\">%s %s %s</div>
						
						<script type=\"text/javascript\">
							$(\".big\").fadeIn(fadeSpeedLong/2);
						</script>", self::noteHead($folderID,$id), $note->note, self::$NOTE_FOOT);
						
					echo sprintf("<script type=\"text/javascript\">
									setButton0(\"\");
								   	setButton1(\"\");
								   	setButton2(\"Edit\");
								   	setURL(\"index.php?%s\",\"%s\");
							   	</script>","folderID=$folderID&noteID=$id", $note->title);
				}
				catch(Exception $e){
					return "Note Not Found";
				}
			}
			
			/**
			 * @param parrentFolderID - the parent of the note
			 * @param $noteID - note to override can be null
			 * @param title - the title of the note
			 * @param note - the note body
			 */
			public static function save(IModel $model,Note $note){
				new NoteEditor($model, $note->folderID,$model->saveNote($note)); //display what we just saved
			}
			
			/**
			 * Permanently deletes the note from the db
 			 * @param noteID- the note ID to delete
			 */
			public static function remove(IModel $model,$noteID){
				new NoteBook($model, $model->removeNote($noteID));
			}
			
			/**
			 * change a notes parent
			 * @param noteID - the note id to change the folder of
			 * @param newParrentID - the new parent of the folder
			 */
			public static function moveNote(IModel $model,$noteID, $newParrentID){
				$model->moveNote($noteID, $newParrentID);
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
