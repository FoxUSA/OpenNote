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
        .when("/settings/",
            {
        		controller: "settingsController",
                templateUrl: "openNote/partials/settings/settingsPartial.html"
            })
        .when("/settings/database/",
            {
        		controller: "databaseController",
                templateUrl: "openNote/partials/settings/databasePartial.html"
            })
        .when("/settings/legacy/",
            {
        		controller: "legacyController",
                templateUrl: "openNote/partials/settings/legacyPartial.html"
            })
		.otherwise({ redirectTo: "/folder" });
});