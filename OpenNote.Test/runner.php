<html>
	<body>
		<textarea style="width: 100%; height: 100%;">
			<?php
				//include_once dirname(__FILE__)."/tests/controller/NoteBook.test.php";
			
				$argv = array(
					//"--coverage-html", "./", 
					"",
					//dirname(__FILE__)."/tests/controller/NoteBook.test.php",
					dirname(__FILE__)."/tests/controller/NoteEditor.test.php"
				);
				$_SERVER["argv"] = $argv;
				include_once "phar://phpunit.phar";
				
			?>
		</textarea>
	</body>
</html>