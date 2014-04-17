//Module Declaration
var openNote = angular.module("openNote", ["ngRoute","ngResource"]);

/**
 * Used to redirect users to login if their token has expired
 */
openNote.run(function ($rootScope, $location, userService){
    $rootScope.$on("$routeChangeStart", function (event) {
    	//TODO fade in for every view here?
        if (!userService.hasValidToken()&&$location.path()!="/") {
            event.preventDefault();
            $location.path("/");
        }
    });
});