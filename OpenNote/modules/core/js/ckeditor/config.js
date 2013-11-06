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
	
	//include imagepaste plugin if present
		$.ajax({
		  url: "/OpenNote/modules/core/js/ckeditor/plugins/imagepaste/plugin.js", //or your url
		  success: function(data){
		    config.extraPlugins			=	"imagepaste";
		  },
		  error: function(data){
		  },
		});
		
	config.height 						= 	"500px";
	config.disableNativeSpellChecker 	= 	false; 
	
};
