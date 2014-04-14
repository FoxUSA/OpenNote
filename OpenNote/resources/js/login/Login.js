	
var loginManager = {
	/**
	 *display the login form 
	 */
	display: function(){
		$(".wrap").hide();
		$(".wrap").load("js/login/login.html", function(){
			$(".wrap").fadeIn(fadeSpeedLong/2);
		});
	},
	
	// store if a botton was clicked
	clicked: 0,

	//login button is clicked
	loginBox: function(){
			if( this.clicked == 0 ){
				this.clicked = 1;
				$(".homeButtons").fadeOut(200);
				$("#loginBox").fadeOut(200,function(){
					$("#login").fadeIn(function(){ this.clicked=0;});
				});
			};
	},
	
	//Register button is clicked
	regBox: function(){
		if( this.clicked == 0 ){
			this.clicked = 1;
			$(".homeButtons").fadeOut(200);
			$("#regBox").fadeOut(200, function(){
				$("#register").fadeIn(function(){ this.clicked=0;});
			});
		}
	},
	
	//Check 
	checkAvailable: function(userName){	
		if(userName.length >= 4)
			return restClient.get(config.servicePath()+"/user/"+userName);
	}
};

$(document).ready(function(){
	loginManager.display();
	
	$(document).on("click","#loginBox",function(){
		loginManager.loginBox();
	});
	
	$(document).on("click","#regBox",function(){
		loginManager.regBox();
	});
	
	$(document).on("keyup","#regU",function(){
		var serviceResult = loginManager.checkAvailable($("#regU").val());
		if(serviceResult!=null){
			console.log(serviceResult.returnCode);
			console.log(serviceResult);
			if(serviceResult.returnCode==302)
				$("#availability").html("  Not Available");
			else 
				if(serviceResult.returnCode==404)
					$("#availability").html("  Available");
				else
					$("#availability").html("  Error");
		}
		else
			$("#availability").html("");
	});
});
/*
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
 */