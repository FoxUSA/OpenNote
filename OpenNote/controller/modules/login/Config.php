<?php
/**
 *	Project name: Login Module
 * 	Author: Jacob Liscom
 *	Version: 13.10.0
**/
	abstract class LoginConfig{
		
		/**
		 * path to common script
		 * 
		 * common script will need to reference this 
		 */
		 	public static function getCommonPath(){
		 		return "/../../common.php";
		 	} 
		 
		 /**
		  * JS dependencies
		  */
		 	public static function getJQueryPath(){
		 		return "../../js/jquery.js";
		 	}
			
			public static function getJSDialogPath(){
				 return "../../js/jqueryPlugins/jqdialog/jqdialog.min.js";
			}
			
			public static function getJSDialogCSSPath(){
				return "../../js/jqueryPlugins/jqdialog/jqdialog.min.css";
			}
			
		/**
		 * Style
		 */
		 	public static function getStyleSheetPath(){
		 		return "style.css";
			}
	}

?>