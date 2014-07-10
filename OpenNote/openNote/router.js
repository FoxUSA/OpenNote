//Router
openNote.config(function($routeProvider){
	$routeProvider
		.when("/",
			{
				controller: "loginController",
				templateUrl: "openNote/partials/loginPartial.html"
			})
        .when("/folder/:id?",
            {
                controller: "folderController",
                templateUrl: "openNote/partials/folderPartial.html",
            })
        .when("/note/:id?",
            {
                controller: "noteController",
                templateUrl: "openNote/partials/notePartial.html"
            })
        .when("/search/:id?",
            {
                templateUrl: "openNote/partials/searchPartial.html"
            })
		.otherwise({ redirectTo: "/" });
});