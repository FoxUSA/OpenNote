/**
 * @param $scope - Angular scope injected automatically  
 * @param userService - the user service to use for rest calls
 */
openNote.controller("loginController", function($scope, $rootScope, userService, $location, config) {
	$scope.userName = "";//this is automatically created in view binding Here for clarity
	$scope.password = "";
	$scope.isAvailable = "";
	$scope.clicked = 0;
	
	/**
	 * Redirect user if they are already logged in
	 */
	$scope.init = function(){
		if(!userService.hasValidToken())
			$(".loginPartial").fadeIn(config.fadeSpeedLong);
		else{
			$location.path("/folder/");
			$rootScope.$emit("reloadListView", {});
		}
	};
	/**
	 *check to see if the user is available 
	 */
	$scope.checkAvailability = function(){
		if($scope.userName.length >= 4){
			try{
				userService.isAvailable($scope.userName).then(function(data){
					if(data)
						$scope.isAvailable = "Available";
					else
						$scope.isAvailable = "Not Available";
				});
			}
			catch(e){
				$scope.isAvailable = "Error";
			}
		}
		else
			$scope.isAvailable = "Username must be at least 4 characters.";
	};

	/**
	 * login button is clicked
	 */
	$scope.loginButton = function(){
			if( $scope.clicked == 0 ){
				$scope.clicked = 1;
				$(".homeButtons").fadeOut(config.fadeSpeedShort, function(){
					$("#login").fadeIn(config.fadeSpeedShort);
				});
			};
	};
	
	/**
	 * Register button is clicked
	 */
	$scope.registerButton = function(){
		if( $scope.clicked == 0 ){
			$scope.clicked = 1;
			$(".homeButtons").fadeOut(config.fadeSpeedShort, function(){
				$("#register").fadeIn(config.fadeSpeedShort);
			});
		}
	};
	
	/**
	 * reset the buttons
	 */
	$scope.resetButtons = function(){
		if( $scope.clicked == 1 ){
			$scope.clicked = 0;
			$("#login").fadeOut(config.fadeSpeedShort, function(){
				$("#register").fadeOut(config.fadeSpeedShort, function(){
					$(".homeButtons").fadeIn(config.fadeSpeedShort);
				});
			});
		};
	};
	
	/**
	 * Log user in with given credentials
	 */
	$scope.login = function(){
		try{
			userService.login($scope.userName,$scope.password).then(function(data){
				if(data){
					$(".loginPartial").fadeOut(config.fadeSpeedShort(),function(){
						$scope.$apply(function(){
							alertify.success("Credentials Accepted");
							$rootScope.$emit("reloadListView", {}); //send and event to tell the list view to reload
							$location.path("/folder/");
						});
					});
				}
				else
					alertify.error("Invalid credentials");
			});
		}
		catch(e){
			$scope.isAvailable = "Error";
		}
	};
	
	/**
	 * Register user in with given credentials
	 */
	$scope.register = function(){
		try{
			userService.register($scope.userName,$scope.password).then(function(data){
				if(data){
					$(".loginPartial").fadeOut(config.fadeSpeedShort(),function(){
						$scope.$apply(function(){
							alertify.success("Registration Accepted");
							$rootScope.$emit("reloadListView", {}); //send and event to tell the list view to reload
							$location.path("/folder/");
						});
					});
				}
				else
					alertify.error("Invalid credentials");
			});
		}
		catch(e){
			$scope.isAvailable = "Error";
		}
	};
	
	$scope.init();
});