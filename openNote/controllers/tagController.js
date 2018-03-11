import openNote from "../openNote.js";
openNote.controller("tagController", ["$scope",
    "$rootScope",
    "$location",
    "$routeParams",
    "storageService",
    "config",
    "tagService",
    function($scope,
        $rootScope,
        $location,
        $routeParams,
        storageService,
        config,
        tagService) {
        $rootScope.buttons = [];

        /**
         * Load a note
         * @param note - load a note
         */
        $scope.loadNote = function(note) {
            $(".note").fadeTo(config.fadeSpeedShort(), 0, function() {
                $location.url("/note/" + note._id);
                $scope.$apply();
            });
        };

        /**
         * Load tags
         */
        var loadTags = function() {
            tagService.getMap().then(function(map) {
                var tags = map.tags[$scope.tag];
                tags.forEach(function(tag) {
                    storageService.get(tag).then(function(note) {
                        $scope.notes.push({
                            doc:note
                        });
                        $scope.$apply();
                    });
                });
            });
        };
        $scope.notes = [];
        $scope.tag = $routeParams.tag;
        loadTags();
    }
]);
