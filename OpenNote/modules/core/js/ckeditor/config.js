/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.removePlugins 				=	"newpage,save,templates,about,liststyle,tabletools,scayt,menubutton,contextmenu"; //remove some icons
	
    config.filebrowserUploadUrl 		=  	"/OpenNote/modules/core/upload.php";
	config.filebrowserImageUploadUrl 	=  	"/OpenNote/modules/core/upload.php";
	
	config.height 						= 	"500px";
	config.disableNativeSpellChecker 	= 	false; 
	
};
