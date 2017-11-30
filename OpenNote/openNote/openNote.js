/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

//Module Declaration
var openNote = angular.module("openNote", ["ngRoute",
    "ngResource",
    "ngSanitize",
    "ngAnimate"
]);

/**
 * Used to redirect users to login if their token has expired
 * Runs on every route
 */
openNote.run(function($rootScope,
    $location,
    config,
    tagService,
    $http) {

    $rootScope.version = config.getVersion();
    tagService.bindHandlers();
    $rootScope.$on("$routeChangeStart", function() {

        //Initial entry after if logged in
        if (!$rootScope.showMenu && !$rootScope.showSideBar) //make sure we only fade in/run once
            $rootScope.$emit("init");
    });

    /**
     * Initialize app and start fade in
     */
    $rootScope.$on("init", function() {
        $rootScope.showMenu = true;
        $rootScope.showSideBar = true;

        //Check for updates
        $http.get(config.getUpdateURL()).then(
            function(response) { //Successful
                if (response.data.version != config.getVersion())
                    alertify.log("<a href='https://github.com/FoxUSA/OpenNote' target='_blank'>Update available</a>", "", 0);
            }
        );
    });
});
