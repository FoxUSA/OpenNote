import openNote from "../openNote.js";

openNote.directive("folderContentsDirective", [
        "config",
        "storageService",
        "$location",
    	function(config, storageService, $location) {
        return {
            restrict: "E", //class
            templateUrl: "openNote/partials/directives/folderContentsPartial.html",
            scope: {
                fadeOut: "=", //basically make the fadeOut method public
                contents: "<" //Accept contents as a parameter
            },
            link: function($scope) {
                /**
                 * fade out all folders
                 */
                $scope.fadeOut = function(callback) {
                    var selector = $(".note, .folder");
                    if(!selector.length)//If its a blank folder just run the callback
                        return callback();

                    selector.fadeTo(config.fadeSpeedShort(), 0, function() {
                        $scope.$apply(function() {
                            callback();
                        });
                    });
                };

                /**
                 * Load a folder
                 * @param folder- the folder to load
                 */
                $scope.loadFolder = function(folder) {
                    $scope.fadeOut(function() {
                        $location.url("/folder/" + folder.doc._id);
                    });
                };

                /**
                 * Load a note
                 * @param note - load a note
                 */
                $scope.loadNote = function(note) {
                    $scope.fadeOut(function() {
                        $location.url("/note/" + note.doc._id);
                    });
                };

                /**
                 * Filter out everything but type folder
                 */
                $scope.folderFilter = function(object) {
                    return storageService.folderFilter(object);
                };

                /**
                 * Filter out everything but type note
                 */
                $scope.noteFilter = function(object) {
                    return storageService.noteFilter(object);
                };
            }
        };
    }]);
