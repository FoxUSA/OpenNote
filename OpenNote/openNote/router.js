//Router
openNote.config(function($routeProvider){
	$routeProvider
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
        		controller: "searchController",
                templateUrl: "openNote/partials/searchPartial.html"
            })
		.otherwise({ redirectTo: "/folder" });
});