$(document).ready(function(){

	$("#login").hide();
	$("#register").hide();

	// handle login
		$("#loginForm").submit(function() {
			$.jqDialog.notify("Please wait..");
			
			var regUser = $("#logU").val();
			var regPass = $("#logP").val();
			
			$.post("ajax.php", {login: true, userName: regUser, password: regPass}, function(response){
				$.jqDialog.notify(response, 5);
			});
			
			return false;
		});
	
	
	// handle signup
		$("#regForm").submit(function(){
			
			var regUser = $("#regU").val();
			var regPass = $("#regP").val();//TODO client side encrypting
	
			if( regUser.length , 4 && regPass.length < 6 ){
				$.jqDialog.notify("Please choose a valid username (minimum 4 chars) and password (minimum 6 chars)", 5);
				return false;
			}
			
			$.jqDialog.notify("Please wait..");

			$.post("ajax.php",{ register: true, userName: regUser, password: regPass}, function(response){
				$.jqDialog.notify(response, 5);
			});
			
			return false;//will keep the browser from attempting to submit the form on its own
		}); 

	//check username
		$("#regU").keyup(function(){
			var regUser = $(this).val();
	
			if(regUser.length >= 4){
				$.post("ajax.php",  {checkAvailability: true, userName: regUser}, function(response){
					$("#availability").html(response);
				});
			}
			else{
				$("#availability").html("");
			}
		});

	var clicked=0;
	
	//login button is clicked
		$("#loginBox").click(function(){
			if( clicked == 0 ){
				clicked=1;
				$(".homeButtons").fadeOut(200);
				$(this).fadeOut(200,function(){
					$("#login").fadeIn(function(){ clicked=0;});
				});
			}
		});

	//Register button is clicked
		$("#regBox").click(function(){
			if( clicked == 0 ){
				clicked=1;
				$(".homeButtons").fadeOut(200);
				$(this).fadeOut(200, function(){
					$("#register").fadeIn(function(){ clicked=0;});
				});
			}
		});
});