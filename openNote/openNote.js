//Scripts to bundle
import "script-loader!../node_modules/jquery/dist/jquery.min.js";
import "script-loader!../node_modules/pouchdb/dist/pouchdb.min.js";
import "script-loader!../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "script-loader!../node_modules/angular/angular.js";
import "script-loader!../node_modules/angular-animate/angular-animate.min.js";
import "script-loader!../node_modules/angular-resource/angular-resource.min.js";
import "script-loader!../node_modules/angular-route/angular-route.min.js";
import "script-loader!../node_modules/angular-sanitize/angular-sanitize.min.js";
import "script-loader!../node_modules/alertify/lib/alertify.min.js";

//Style
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/alertify/themes/alertify.core.css";
import "../node_modules/codemirror/lib/codemirror.css";
import "../node_modules/codemirror/theme/material.css";
import "../openNote/style/invert/light/alertify.css";
import "../openNote/style/invert/light/style.css";
import "../openNote/style/animations.css";


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
openNote.run([
    "$rootScope",
    "$location",
    "config",
    "tagService",
    "$http",
    "$timeout",
    function($rootScope,
        $location,
        config,
        tagService,
        $http,
        $timeout) {

        $rootScope.version = config.getVersion();
        tagService.bindHandlers();
        $rootScope.$on("$routeChangeStart", function() {

            //Initial entry after if logged in
            if (!$rootScope.showUI) //make sure we only fade in/run once
                $rootScope.$emit("init");
        });

        /**
         * Initialize app and start fade in
         */
        $rootScope.$on("init", function() {
            $timeout(function(){
                $rootScope.showUI = true;
            });//Wait for everything to make sure fade in is not skipped

            //Check for updates
            $http.get(config.getUpdateURL()).then(
                function(response) { //Successful
                    if (response.data.version != config.getVersion())
                        alertify.log("<a href='https://github.com/FoxUSA/OpenNote' target='_blank'>Update available</a>", "", 0);
                }
            );
        });
    }
]);

export default openNote;
