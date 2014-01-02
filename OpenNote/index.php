<?php
/**
 *	Project name: Open Note
 *	File-name: index.php
 * 	Author: Jacob Liscom
 *	Version: 13.6.0
**/

	include_once dirname(__FILE__)."/controller/common.php";
	
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
	 
	<!--[if IE]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

<?php
	
	//styles
		foreach(Config::getAllCSSIncludes() as $cssInclude)
			echo sprintf("<link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"%s\"/>\n", $cssInclude);
		
	//js
		foreach(Config::getAllJSIncludes() as $jsInclude)
			echo sprintf("<script src=\"%s\" type=\"text/javascript\"></script>\n", $jsInclude);

?>

	<script src="./ajax.js.php" type="text/javascript"></script><!--JS event code and ajax client code-->
 
</head>
<body> 
	<div id="header">
		<div class="left">
			<button type="button" class="customButton" id="home">Notes</button> 
			<?php NoteBook::checkForOpenNoteUpdate(); ?>
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
					new NoteBook(new Model());
				else
					if($noteID==null)
						new NoteBook(Config::getModel(),$folderID);
					else
						new NoteEditor(Config::getModel(),$folderID, $noteID);
			?>
		</div>		
	</div>
</body>
</html>
