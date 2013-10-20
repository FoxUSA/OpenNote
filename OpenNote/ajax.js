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
	function setURL(url,title){
		window.history.pushState({"pageTitle":title},"", url);
	}

//make the back buttons work
	window.onpopstate = function(){
		//window.location.reload();
	};
	
//invert colors
	function invertColor(){
		// the css we are going to inject
		var css = 'html {-webkit-filter: invert(100%);' +
		    '-moz-filter: invert(100%);' + 
		    '-o-filter: invert(100%);' + 
		    '-ms-filter: invert(100%); }',
		
		head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		
		// a hack, so you can "invert back" clicking the bookmarklet again
		if (!window.counter) { window.counter = 1;} else  { window.counter ++;
		if (window.counter % 2 == 0) { var css ='html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'}
		 };
		
		style.type = 'text/css';
		if (style.styleSheet){
		style.styleSheet.cssText = css;
		} else {
		style.appendChild(document.createTextNode(css));
		}
		
		//injecting the css to the head
		head.appendChild(style);
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
				$("#folderList").html("It Looks Like You Dont Have Any Folders. You Can Create One Using The \"New Folder\" Button In The Top Right.");
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
					"plugins" : [ "themes", "html_data", "crrm","dnd"]
				}).bind("move_node.jstree rename_node.jstree create_node.jstree", function(event, data) {
			        if (event.type === "move_node") {
			            var newParrentID = data.rslt.np.children(".folder").attr("folderID");
		             	var oldParrentID = data.rslt.op.children(".folder").attr("folderID");
			            var folderID = data.rslt.o.children(".folder").attr("folderID");
						
						if(newParrentID==oldParrentID)//do nothing if nothing changed
							return;
						
						//send message to backend
						$.jqDialog.confirm(	
								"Are You Sure You Want To Move This Folder?",
								function(){	//yes							
									$.post("ajax.php",{moveFolder: true, folderID: folderID, newParrentID: newParrentID}, function(){
										$.jqDialog.notify("Folder Moved",5); //all done. close the notify dialog 
									});	
								},
								function(){//no
									getFolderList();
								}); 
			        } 
		         });
				
			$("#folderList").fadeIn(fadeSpeedShort);
		});
	}
	
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
			var folderID = $("#folder").attr("folderID");//custom attribute
			
			$(".boxContainer").fadeOut(fadeSpeedShort);
			$.post("ajax.php",{loadNote: true,folderID:folderID, noteID: noteID}, function(response){
				$(".boxContainer").html(response); //set the contents to the output of the script
				$(".boxContainer").fadeIn(fadeSpeedLong/2);
				
				$.jqDialog.close(); //all done. close the notify dialog  
			});
		});
		
	//folder is clicked
		$(document).on("click",".folder",function(){
			$.jqDialog.notify(waitText);
			var folderID = $(this).attr("folderID");//custom attribute
			if(folderID == null)
				folderID = $(this).attr("boxId");
			
			$(".boxContainer").fadeOut(fadeSpeedShort);
			$.post("ajax.php",{loadFolder: true, folderID: folderID}, function(response){
				$(".boxContainer").html(response); //set the contents to the output of the script
				$(".boxContainer").fadeIn(fadeSpeedShort);
				
				$.jqDialog.close(); //all done. close the notify dialog  
			});
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
		
	//run stuff
		getFolderList();//get the first folder list
});