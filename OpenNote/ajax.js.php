/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
 * 
 * This script requires jquery and jqdialog.
**/
<?php 
	include_once dirname(__FILE__)."/Config.php";
?>

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
	function setURL(url,title){
		window.history.pushState({"pageTitle":title},"", url);
	}

//make the back buttons work
	window.onpopstate = function(){
		//window.location.reload();
	};
	
//reload folder content
	function loadFolder(folderID){
		$(".boxContainer").fadeOut(fadeSpeedShort);
		$.post("ajax.php",{loadFolder: true, folderID: folderID}, function(response){
			$(".boxContainer").html(response); //set the contents to the output of the script
			$(".boxContainer").fadeIn(fadeSpeedShort);
		});
	}

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
									"Are You Sure You Want To Move This Note?",
									function(){	//yes							
										$.post("ajax.php",{moveNote: true, noteID: noteID, newParrentID: newParrentID}, function(){
											loadFolder(oldParrentID);
												
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
									"Are You Sure You Want To Move This Folder?",
									function(){	//yes							
										$.post("ajax.php",{moveFolder: true, folderID: folderID, newParrentID: newParrentID}, function(){
											getFolderList();
											loadFolder(oldParrentID);
	
											$.jqDialog.notify("Folder Moved",5); //all done. close the notify dialog 
										});	
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
								"Are You Sure You Want To Move This Folder?",
								function(){	//yes							
									$.post("ajax.php",{moveFolder: true, folderID: folderID, newParrentID: newParrentID}, function(){
										$.jqDialog.notify("Folder Moved",5); //all done. close the notify dialog 
										loadFolder(oldParrentID);
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
	}
	
	//Button 0 handler
		$(document).on("click","#button0",function(){//click for both touch and click support
			switch($(this).text()){										
				case "New Note": //save button is pressed
					var folderID = $("#folder").attr("folderID");//custom attribute
					$.jqDialog.notify(waitText);
					
					$(".boxContainer").fadeOut(fadeSpeedShort, function(){
					
						$.post("ajax.php",{newNote: true, folderID: folderID}, function(response){
							$(".boxContainer").html(response); //set the contents to the output of the script
							$(".boxContainer").fadeIn(fadeSpeedLong/2);
							
							$.jqDialog.close(); 
						});
					});
					break;
			}
		});
		
	//Button 1 handler
		$(document).on("click","#button1",function(){
			switch($(this).text()){										
				case "Save": //save button is pressed
					$.jqDialog.notify(waitText);
					
					var title = $("#noteName").val();
					var note = CKEDITOR.instances["note"].getData();
					var noteID = $("#note").attr("noteID");
					var folderID = $("#note").attr("folderID");
					
					$(".boxContainer").fadeOut(fadeSpeedShort);
					$.post("ajax.php",{saveNote: true, folderID: folderID, noteID: noteID, title: title, note: note}, function(response){
						$(".boxContainer").html(response); //set the contents to the output of the script
						$(".boxContainer").fadeIn(fadeSpeedShort);
						
						$.jqDialog.notify("Note Saved",5); //all done. close the notify dialog 
					});
					break;
					
				case "New Folder": //save button is pressed
					var folderID = $("#folder").attr("folderID");//custom attribute
					var folderName = $("#folderTitle").html();
					
					var prompt = "";
					if (folderName==null)
						prompt = "Please Enter A Name For This Folder";
					else
						prompt = "Please Enter A Name For The New Folder That Will Be Created In "+folderName;
						
					$.jqDialog.prompt(	
							prompt,
							"",
							function(data){
								$(".boxContainer").fadeOut(fadeSpeedShort);
								$.post("ajax.php",{newFolder: true, folderID: folderID, name: data}, function(response){
									$(".boxContainer").html(response); //set the contents to the output of the script
									$(".boxContainer").fadeIn(fadeSpeedShort);
									
									$.jqDialog.notify("Folder Created",5); //all done. close the notify dialog 
								});
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
					var noteID = $("#note").attr("noteID")
					
					$.jqDialog.confirm("Are You Sure You Want To Clear Your Changes?",
						function() { 
							$.jqDialog.notify(waitText);
							$(".boxContainer").fadeOut(fadeSpeedShort);
							$.post("ajax.php",{loadNote: true,folderID:folderID, noteID: noteID}, function(response){
								$(".boxContainer").html(response); //set the contents to the output of the script
								$(".boxContainer").fadeIn(fadeSpeedShort);
								
								$.jqDialog.close(); //all done. close the notify dialog  
							});
						},		// callback function for 'YES' button
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
		
			$.jqDialog.confirm("Are You Sure You Want To Delete This Note?",
						function() {	
							$(".boxContainer").fadeOut(fadeSpeedShort);
							$.post("ajax.php",{removeNote: true, noteID: noteID}, function(response){
								$(".boxContainer").html(response); //set the contents to the output of the script
								$(".boxContainer").fadeIn(fadeSpeedShort);
								
								$.jqDialog.notify("Note Deleted",5); //all done. close the notify dialog 
							});
						},		// callback function for 'YES' button
						null	//call back for no
					);
		});	
		
	//note is clicked
		$(document).on("click",".note",function(){
			$.jqDialog.notify(waitText);
			var noteID = $(this).attr("boxID");//custom attribute
			var folderID = $(this).attr("otherID");//custom attribute
			
			$(".boxContainer").fadeOut(fadeSpeedShort);
			$.post("ajax.php",{loadNote: true,folderID:folderID, noteID: noteID}, function(response){
				$(".boxContainer").html(response); //set the contents to the output of the script
				$(".boxContainer").fadeIn(fadeSpeedLong/2);
				
				$.jqDialog.close(); //all done. close the notify dialog  
			});
		});
		
	//Home button
		$(document).on("click","#home",function(){//click for both touch and click support
			$.jqDialog.notify(waitText);
					
			$(".boxContainer").fadeOut(fadeSpeedShort, function(){
				$.post("ajax.php",{loadFolder: true}, function(response){
					$(".boxContainer").html(response); //set the contents to the output of the script
					$(".boxContainer").fadeIn(fadeSpeedShort);
					
					$.jqDialog.close(); 
				});
			});
		});
		
	//Title is clicked
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
			
			loadFolder(folderID);
			
			$.jqDialog.close(); //all done. close the notify dialog//FIXME this gets called before everything is visible
		});
		
	//remove folder is clicked
		$(document).on("click","#removeFolder",function(){
			$.jqDialog.confirm("Are You Sure You Want To Delete This Folder?",
				function() {	
					$.jqDialog.notify(waitText);
					var folderID = $("#folder").attr("folderID");//custom attribute
					
					$(".boxContainer").fadeOut(fadeSpeedShort);
					$.post("ajax.php",{removeFolder: true, folderID: folderID}, function(response){
						$(".boxContainer").html(response); //set the contents to the output of the script
						$(".boxContainer").fadeIn(fadeSpeedShort);
						
						$.jqDialog.close(); //all done. close the notify dialog  
					});
				},		// callback function for 'YES' button
				null	//call back for no
			);
		});
	
	//Rename folder
		$(document).on("click","#renameFolder",function(){
			$.jqDialog.prompt("New Folder Name:",
				"",
				function(data) { 
					$.jqDialog.notify(waitText);
					var folderID = $("#folder").attr("folderID");//custom attribute
					
					$(".boxContainer").fadeOut(fadeSpeedShort);
					$.post("ajax.php",{renameFolder: true, folderID: folderID, name: data}, function(response){
						$(".boxContainer").html(response); //set the contents to the output of the script
						$(".boxContainer").fadeIn(fadeSpeedShort);
						
						$.jqDialog.close(); //all done. close the notify dialog  
					});
				},		
				null
			);
		});
		
	//run stuff
		getFolderList();//get the first folder list
});