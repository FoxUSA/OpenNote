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
        .when("/note/:noteID?",
            {
                controller: "folderController",
                templateUrl: "openNote/partials/notePartial.html"
            })
		.otherwise({ redirectTo: "/" });
});