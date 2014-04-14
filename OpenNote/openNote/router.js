//Router
openNote.config(function($routeProvider){
	$routeProvider
		.when("/",
			{
				controller: "loginController",
				templateUrl: "openNote/partials/loginPartial.html"
			})
        .when("/folder/:folderID?",
            {
                controller: "folderController",
                templateUrl: "openNote/partials/folderPartial.html"
            })
		.otherwise({ redirectTo: "/" });
});