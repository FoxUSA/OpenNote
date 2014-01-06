<html>
	<body>
		<a href="./report">Coverage Report</a>
		<textarea style="width: 100%; height: 90%;">
			<?php
				//include_once dirname(__FILE__)."/tests/controller/NoteBook.test.php";
			
				$argv = array(
					"--coverage-html", "./report"
				);
				$_SERVER["argv"] = $argv;
				include_once "phar://phpunit.phar";
				
			?>
		</textarea>
	</body>
</html>