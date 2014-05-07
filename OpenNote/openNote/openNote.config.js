/**
 * Angular js config file
 */
openNote.constant("config", {
	
	/**
	 * http path to backend rest service
	 */
	servicePath: function(){
		return "/OpenNoteService-PHP";
	},
	
	/**
	 * Used to compute randome short fade speed
	 */
	fadeSpeedShort: function(){ 
		return 250*Math.random()+200;
	},
	
	/**
	 * Used to compute randome long fade speed
	 */
	fadeSpeedLong: function(){
		return 2000*Math.random()+200;
	},
	
	/**
	 * @param dark - true if dark theme
	 * @return - ckeditor config object
	 */
	editorConfig: function(dark){
		var temp = {
			// Define changes to default configuration here. For example,
			// config.language : 'fr',
			//config.uiColor : '#000000',
			
			removePlugins 				:	"newpage,save,templates,about,liststyle,tabletools,scayt,contextmenu", //remove some icons menubutton
			
		    //filebrowserUploadUrl 		:  	"<?php echo Config::getUploadPath()?>",
			//filebrowserImageUploadUrl :  	"<?php echo Config::getUploadPath()?>",
	
			//extraPlugins				:	"imagepaste",
			
			height 						: 	"400px",
			disableNativeSpellChecker 	: 	false
		}
		if(dark){
			temp.contentsCss = "openNote/style/dark/note.dark.css";
			temp.skin = "moono.dark,../../openNote/style/dark/ckeditor/moono.dark/";
		}
		else{
			temp.contentsCss = "openNote/style/dark/note.css";
		}
		
		return temp;
	},
	
	/**
	 * returns help contents
	 */
	getHelpContent: function(){
		return {
			homeButton: "Click here to return to home page",
			listArea:"",
			newNoteButton:"",
			newFolderButton:"",
			findButton:"",
			folderEditModeButton:"",
			folderArea:""
		}
	},
	
	/**
	 * Do we want to show the help button
	 */
	showHelpButton: function(){
		return true;
	},
	
	/**
	 * Do we want to show the log Out button
	 */
	showLogOutButton: function(){
		return true;
	}
	
});