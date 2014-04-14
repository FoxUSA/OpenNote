/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
 * 
 * This script requires jquery and jqdialog.
**/
var waitText = "Please Wait";

var fadeSpeedShort = 250;
var fadeSpeedLong = 2000;

//change the button text to something else
	function setButton0(name){
		$("#button0").text(name);
	}
	
	function setButton1(name){
		$("#button1").text(name);
	}
	
	function setButton2(name){
		$("#button2").text(name);
	}

//Update the url bar
	function setURL(url,title, reload){
		reload = reload||false;//default is a new load not a history call
		if(!reload)
			window.history.pushState({"pageTitle":title},"", url);
	}

//make the back buttons work
	window.onpopstate = function(){
		//window.location.reload();
	};

$(document).ready(function(){	
//get the folder list
	window.getFolderList= function(){
		$.post("ajax.php",{getFolderList: true}, function(response){
			if($.trim($("#folderList").html())!="") // remove ide formating byproucts 
				$("#folderList").fadeOut(fadeSpeedShort);
			else
				$("#folderList").hide();
			
			if($.trim(response)==""){
				$("#folderList").html("It looks like you dont have any folders. You can create one using the \"New Folder\" button in the top right of the page.");
				$("#folderList").fadeIn(fadeSpeedShort);
				return;
			}
				
			$("#folderList").html(response); //set the contents to the output of the script
			
			//convert to list
				$("#folderList").jstree({ 
					"themes" : {
			           	"theme" : "default",
			            "dots" : false,
			            "icons" : false
			        },
					"dnd" : {//Drag box's into list
						"drag_finish" : function (data) {
							var oldParrentID;
							var newParrentID;
							
							if($(data.o).closest(".box").hasClass("note")){//is note
								var noteID = $(data.o).closest(".box").attr("boxID"); //object dropped
								oldParrentID = $(data.o).closest(".box").attr("otherID"); //object dropped
								newParrentID = data.r.children(".folder").attr("folderID"); //object dropped on 
								
								if(newParrentID==oldParrentID)//do nothing if nothing changed
									return;
									
								$(".boxContainer").fadeOut(fadeSpeedShort);	
								
								$.jqDialog.confirm(	
									"Are you sure you want to move this note?",
									function(){	//yes							
										$.post("ajax.php",{moveNote: true, noteID: noteID, newParrentID: newParrentID}, function(){
											noteBook.loadFolder(oldParrentID);
												
											$.jqDialog.notify("Note Moved",5); //all done. close the notify dialog 
										});	
									},
									function(){//no
										$(".boxContainer").fadeIn(fadeSpeedShort);
									}
								);
							}
							else{//is folder
								var folderID = $(data.o).closest(".box").attr("boxID"); //get the folders id
								
								oldParrentID = $("#folder").attr("folderID");//get current folder //TODO DRY in a function or global variable
								newParrentID = data.r.children(".folder").attr("folderID"); //object dropped on 
								
								if(newParrentID==oldParrentID || newParrentID==folderID)//do nothing if nothing changed
									return;
									
								$(".boxContainer").fadeOut(fadeSpeedShort);		
									
								$.jqDialog.confirm(	
									"Are you sure you want to move this folder?",
									function(){	//yes						
										noteBook.moveFoler(folderID, newParrentID, oldParrentID);	
									},
									function(){//no
										$(".boxContainer").fadeIn(fadeSpeedShort);
									}
								); 
							}
						}
					},
					"plugins" : [ "themes", "html_data", "crrm","dnd"]
				}).bind("move_node.jstree rename_node.jstree create_node.jstree", function(event, data) {
			        if (event.type === "move_node") {
			            var newParrentID = data.rslt.np.children(".folder").attr("folderID");
		             	var oldParrentID = data.rslt.op.children(".folder").attr("folderID");
			            var folderID = data.rslt.o.children(".folder").attr("folderID");
						
						if(newParrentID==oldParrentID)//do nothing if nothing changed
							return;
						
						$(".boxContainer").fadeOut(fadeSpeedShort);	
						
						//send message to backend
							$.jqDialog.confirm(	
								"Are you sure you want to nove this folder?",
								function(){	//yes							
									$.post("ajax.php",{moveFolder: true, folderID: folderID, newParrentID: newParrentID}, function(){
										$.jqDialog.notify("Folder Moved",5); //all done. close the notify dialog 
										noteBook.loadFolder(oldParrentID);
									});	
								},
								function(){//no
									$(".boxContainer").fadeIn(fadeSpeedShort);
									getFolderList();
							}); 
			        } 
		         });
				
			$("#folderList").fadeIn(fadeSpeedShort);
		});
	};
	
	//Button 0 handler
		$(document).on("click","#button0",function(){//click for both touch and click support
			switch($(this).text()){										
				case "New Note": //save button is pressed
					noteBook.note.newNote($("#folder").attr("folderID"));
					break;
			}
		});
		
	//Button 1 handler
		$(document).on("click","#button1",function(){
			switch($(this).text()){										
				case "Save": //save button is pressed
					$.jqDialog.notify(waitText);
					
					noteBook.note.save(	$("#noteName").val(), 
										CKEDITOR.instances["note"].getData(), 
										$("#note").attr("noteID"), 
										$("#note").attr("folderID"));
					break;
					
				case "New Folder": //save button is pressed
					var folderName = $("#folderTitle").html();
					
					var prompt = "";
					if (folderName==null)
						prompt = "Please enter a name for this folder";
					else
						prompt = "Please enter a name for the new folder that will be created in "+folderName;
						
					$.jqDialog.prompt(	
							prompt,
							"",
							function(data){
								noteBook.newFolder(data, $("#folder").attr("folderID"));
							},
							null);
					break;
			}
		});
		
	//Button 2 handler
		$(document).on("click","#button2",function(){
			switch($(this).text()){
				case "Edit": //switch to the edit class
					$.jqDialog.notify(waitText);
					
					$(".boxContainer").fadeOut(fadeSpeedShort, function(){
						//reset the menu
							setButton0("");
						   	setButton1("Save");
						   	setButton2("Clear");
						   	
						//remove the box and bar classes from the parrent
							$(".box.big").removeClass("box big");
							$("#removeNote").show();
						   	
						//convert the note div into a editor
							CKEDITOR.replace("note");
							
						//make title editable
							$("#noteName").removeAttr("readonly");
						
						$(".boxContainer").fadeIn(fadeSpeedLong/2);
						
						$.jqDialog.close();
					});
					break;
				
				case "Clear":
					var folderID = $("#note").attr("folderID");
					var noteID = $("#note").attr("noteID");
					
					$.jqDialog.confirm("Are you sure you want to clear your changes?",
						function() {
							noteBook.note.load(noteID,folderID); 
						},			// callback function for 'YES' button
						null		//callback function for 'NO' button
					);
					break;
				
				case "Find":
					$.jqDialog.prompt("Search:",
						"",
						function(data) { 
							$.jqDialog.notify(waitText);
							
							$(".boxContainer").fadeOut(fadeSpeedShort);
							$.post("ajax.php",{search: true, searchString: data}, function(response){
								$(".boxContainer").html(response); //set the contents to the output of the script
								$(".boxContainer").fadeIn(fadeSpeedShort);
								
								$.jqDialog.close(); //all done. close the notify dialog  
							});
						},		
						null
					);
					break;
			}
		});
		
	//remove note is pressed
		$(document).on("click","#removeNote",function(){
			var noteID = $(this).attr("noteID");//custom attribute
		
			$.jqDialog.confirm("Are you sure you want to delete this note?",
						function() {
							noteBook.note.remove(noteID);							
						},		// callback function for 'YES' button
						null	//call back for no
					);
		});	
		
	//note is clicked
		$(document).on("click",".note",function(){
			$.jqDialog.notify(waitText);
			var noteID = $(this).attr("boxID");//custom attribute
			var folderID = $(this).attr("otherID");//custom attribute
			
			noteBook.note.load(noteID, folderID);
		});
		
	//home button
		$(document).on("click","#home",function(){//click for both touch and click support
			$.jqDialog.notify(waitText);
					
			noteBook.loadFolder(null);
			$.jqDialog.close(); 
		});
		
	//title is clicked
		$(document).on("click","#folderTitle",function(){
			$("#renameFolder").fadeIn(fadeSpeedShort);
			$("#removeFolder").fadeIn(fadeSpeedShort);
		});
		
	
	//folder is clicked
		$(document).on("click",".folder",function(){
			$.jqDialog.notify(waitText);
			
			var folderID = $(this).attr("folderID");//custom attribute
			if(folderID == null)
				folderID = $(this).attr("boxId");
			
			noteBook.loadFolder(folderID);
			
			$.jqDialog.close(); //all done. close the notify dialog//FIXME this gets called before everything is visible
		});
		
	//remove folder is clicked
		$(document).on("click","#removeFolder",function(){
			$.jqDialog.confirm("Are you sure you want to delete this folder?",
				function() {
					noteBook.deleteFolder($("#folder").attr("folderID"));
				},		// callback function for 'YES' button
				null	//call back for no
			);
		});
	
	//Rename folder
		$(document).on("click","#renameFolder",function(){
			$.jqDialog.prompt("New Folder Name:",
				$("#folderTitle").html(),//show the current folder name
				function(data){
					noteBook.renameFolder(data, $("#folder").attr("folderID"));
				},		
				null
			);
		});
		
	//run stuff
		//getFolderList();//get the first folder list//FIXME
});

//history
$(function(){
  $(window).hashchange( function(){
    var hash = location.hash;
    
	if(hash.contains("noteID")){
		var ids=hash.split("&");
		noteBook.note.load(ids[1].replace("noteID=",""), ids[0].replace("#folderID=",""), true);
	}
	else// folder
		noteBook.loadFolder(hash.replace("#folderID=",""),true);
		
  });
  
  $(window).hashchange();
  
});

var noteBook = {
	//load folder content
	loadFolder: function(folderID, reload){
		folderID = folderID || null; //default values
		reload = reload || false; 
		
		$(".boxContainer").fadeOut(	fadeSpeedShort,
									function(){//smooth
										$.post("ajax.php",{loadFolder: true, folderID: folderID, reload: reload}, function(response){
											$(".boxContainer").html(response); //set the contents to the output of the script
											$(".boxContainer").fadeIn(fadeSpeedShort);
										});
									});
	},
	
	//rename a given folder
	renameFolder: function(newName, folderID) { 
		$.jqDialog.notify(waitText);					
		$(".boxContainer").fadeOut(	fadeSpeedShort,
									function(){
										$.post("ajax.php",{renameFolder: true, folderID: folderID, name: newName}, function(response){
											$(".boxContainer").html(response); //set the contents to the output of the script
											$(".boxContainer").fadeIn(fadeSpeedShort);
											
											$.jqDialog.close(); //all done. close the notify dialog  
										});
									});
	},
	
	//delete a given folder
	deleteFolder: function(folderID) {	
		$.jqDialog.notify(waitText);
		
		$(".boxContainer").fadeOut(fadeSpeedShort);
		$.post("ajax.php",{removeFolder: true, folderID: folderID}, function(response){
			$(".boxContainer").html(response); //set the contents to the output of the script
			$(".boxContainer").fadeIn(fadeSpeedShort);
			
			$.jqDialog.close(); //all done. close the notify dialog  
		});
	},
	
	//create a new folder
	newFolder: function(name, folderID){
		folderID = folderID ||null;
		
		$(".boxContainer").fadeOut(fadeSpeedShort);
		$.post("ajax.php",{newFolder: true, folderID: folderID, name: name}, function(response){
			$(".boxContainer").html(response); //set the contents to the output of the script
			$(".boxContainer").fadeIn(fadeSpeedShort);
			
			$.jqDialog.notify("Folder Created",5); //all done. close the notify dialog 
		});
	},
	
	//move a folder
	moveFolder: function(folderID, newParrentID, oldParrentID){
		newParrentID=newParrentID||null;
		
		$.post("ajax.php",{moveFolder: true, folderID: folderID, newParrentID: newParrentID}, function(){
			getFolderList();
			noteBook.loadFolder(oldParrentID);

			$.jqDialog.notify("Folder Moved",5); //all done. close the notify dialog 
		});	
	},

	note: {
		//create a new note
		newNote: function(folderID){
			$.jqDialog.notify(waitText);
					
			$(".boxContainer").fadeOut(fadeSpeedShort, function(){
			
				$.post("ajax.php",{newNote: true, folderID: folderID}, function(response){
					$(".boxContainer").html(response); //set the contents to the output of the script
					$(".boxContainer").fadeIn(fadeSpeedLong/2);
					
					$.jqDialog.close(); 
				});
			});
		},
		
		/** 
		 * @param {Object} title - the note title
		 * @param {Object} note - the note body
		 * @param {Object} noteID - the noteID if we have one
		 * @param {Object} folderID - the folder the note is in
		 */
		save: function(title, note, noteID, folderID){
			noteID = noteID || null;
			$(".boxContainer").fadeOut(fadeSpeedShort);
			$.post("ajax.php",{saveNote: true, folderID: folderID, noteID: noteID, title: title, note: note}, function(response){
				$(".boxContainer").html(response); //set the contents to the output of the script
				$(".boxContainer").fadeIn(fadeSpeedShort);
				
				$.jqDialog.notify("Note Saved",5); //all done. close the notify dialog 
			});
		},
		
		//load a note
		load: function(noteID, folderID, reload){
			reload = reload || false;//default value
			
			$(".boxContainer").fadeOut(fadeSpeedShort);
			$.post("ajax.php",{loadNote: true,folderID:folderID, noteID: noteID, reload: reload}, function(response){
				$(".boxContainer").html(response); //set the contents to the output of the script
				$(".boxContainer").fadeIn(fadeSpeedLong/2);
				
				$.jqDialog.close(); //all done. close the notify dialog  
			});
		},
		
		//remove a note
		remove: function(noteID){
			$(".boxContainer").fadeOut(fadeSpeedShort);
			$.post("ajax.php",{removeNote: true, noteID: noteID}, function(response){
				$(".boxContainer").html(response); //set the contents to the output of the script
				$(".boxContainer").fadeIn(fadeSpeedShort);
				
				$.jqDialog.notify("Note Deleted",5); //all done. close the notify dialog 
			});
		}
	}
	
};