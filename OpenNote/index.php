<?php
/**
 *	Project name: Open Note
 *	File-name: index.php
 * 	Author: Jacob Liscom
 *	Version: 13.6.0
**/

	include_once dirname(__FILE__)."/modules/core/Common.php";
	
	$folderID = null;
	$noteID = null;
	
	if(isset($_GET["folderID"])) //get existing note 
		$folderID = $_GET["folderID"];//syntax index.php?id=$id\"
	if(isset($_GET["noteID"])) //get existing note 
		$noteID = $_GET["noteID"];//syntax index.php?id=$id&noteID=$noteID\"
?>
<!DOCTYPE html>
<html>
	
<head>
	<meta charset=utf-8 />
	<meta name="description" content="description">
	 
	<title>OpenNote</title>
	 
	<link rel="stylesheet" type="text/css" media="screen" href="style.css"/>
	 
	<!--[if IE]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!-- JQuery -->
		<script src="./modules/core/js/jquery.js" type="text/javascript"></script>
			<script src="./modules/core/js/jqueryPlugins/jqdialog/jqdialog.min.js" type="text/javascript"></script>
				<link rel="stylesheet" type="text/css" media="screen" href="./modules/core/js/jqueryPlugins/jqdialog/jqdialog.min.css"><!--Style sheet for jqdialog.min-->
			<script src="./modules/core/js/jqueryPlugins/jstree/jquery.jstree.js" type="text/javascript"></script>
			
		
	<script src="./modules/core/js/ckeditor/ckeditor.js"></script>
	
	<script src="./ajax.js" type="text/javascript"></script><!--JS event code and ajax client code-->
 
</head>
<body> 
	<div id="header">
		<div class="left">
			<button type="button" class="customButton" id="home">Notes</button> 
		</div>
		<div class="right">
			<button type="button" class="customButton" id="button0"></button> 
			<button type="button" class="customButton" id="button1"></button> 
			<button type="button" class="customButton" id="button2"></button> 
		</div>
	</div>
	<div class="sideBar">
		<div id="folderList">
		</div>
	</div>
	
	<div class="wrap">			
		<div class="boxContainer">
			<?php 
				if($folderID ==null)
					new NoteBook();
				else
					if($noteID==null)
						new NoteBook($folderID);
					else
						new NoteEditor($folderID, $noteID);
			?>
		</div>		
	</div>
</body>
</html>
