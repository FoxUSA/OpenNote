<?php 
	include_once dirname(__FILE__)."/../../../Config.php";
?>
/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.removePlugins 				=	"newpage,save,templates,about,liststyle,tabletools,scayt,menubutton,contextmenu"; //remove some icons
	
    config.filebrowserUploadUrl 		=  	"/OpenNote/controller/upload.php";
	config.filebrowserImageUploadUrl 	=  	"/OpenNote/controller/upload.php";
	
	//include imagepaste plugin if present
	<?php
		if(file_exists("plugins/imagepaste/plugin.js"))
			echo "config.extraPlugins	=	\"imagepaste\";";
		
		if(Config::$theme=="dark"){ //figure out which theme if not the default and which note.css to use
			echo "config.skin = \"moono.dark\";";
			echo sprintf("config.contentsCss = \"%s/style/dark/note.dark.css\";", Config::getWebroot());
		}
		else {
			echo sprintf("config.contentsCss = \"%s/style/dark/note.css\";",Config::getWebroot());
		}
	?>
	
	config.height 						= 	"500px";
	config.disableNativeSpellChecker 	= 	false; 
	
};
