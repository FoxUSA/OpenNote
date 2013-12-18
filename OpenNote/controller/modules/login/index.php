<?php
	/**
	 *	Project name: OpenHome
	 * 	Author: Jacob Liscom
	 *	Version: 13.6.0
	**/

include_once dirname(__FILE__)."/Config.php";
	
include_once dirname(__FILE__).LoginConfig::getCommonPath();
?>
<html>
	<head>
		<meta charset=utf-8 />
		<meta name="description" content="description">
		 
		<title>OpenNote Login</title>
		 
		<link rel="stylesheet" type="text/css" media="screen" href=<?php echo sprintf("\"%s\"",LoginConfig::getStyleSheetPath());?>/>
		 
		<!--[if IE]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		
		<script src=<?php echo sprintf("\"%s\"",LoginConfig::getJQueryPath());?> type="text/javascript"></script>
		<script src=<?php echo sprintf("\"%s\"",LoginConfig::getJSDialogPath());?> type="text/javascript"></script>
				<link rel="stylesheet" type="text/css" media="screen" href=<?php echo sprintf("\"%s\"",LoginConfig::getJSDialogCSSPath());?>>
		<script src="./ajax.js" type="text/javascript"></script><!--JS event code and ajax client code-->
	 
	</head>
	<body>
		<div id="wrap">
			<div class="homeContainer">
				<h1>OpenNote</h1>
				<div class="homeButtons">
					<div class="homeBox" id="loginBox">Login</div>
					<?php 
						if(Config::$registrationEnabled) //detect if we even show the button
							echo"<div class=\"homeBox\" id=\"regBox\">Register</div>";
					?>
					<div class="clear"> </div>
				</div>
				<div id="login">
		
					<form method="post" id="loginForm">
		
							<p>
								<label>Username</label>
								<input type="text" name="username" id="logU" />
							</p>
		
							<p>
								<label>Password</label>
								<input type="password" name="password" id="logP" />
							</p>
				
							<p>
								<input type="submit" value="Login" class="button" />
							</p>
		
						</table>
					</form>
		
				</div>
		
				<div id="register">
		
					<form method="post" id="regForm">
						<p>
							<label>Choose a Username</label>
							<input type="text" name="regUser" id="regU"/> <span id="availability"></span>
						</p>
	
						<p>
							<label>Choose a Password</label>
							<label><input type="password" name="reg_pass" id="regP"/></label>
						</p>
			
						<p>
							<input type="submit" value="Register" class="button" />
						</p>
					</form>
		
				</div>
				<div class="clear"> </div>
				<div id="copyRight">&#169; 2013 Jacob Liscom</div>
			</div>
		</div>
	</body>
</html>