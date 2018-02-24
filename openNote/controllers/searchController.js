import openNote from "../openNote.js";
/**
 * Search
 */
openNote.controller("searchController", ["$scope",
    "$rootScope",
    "config",
    "storageService",
    "$location",
    "$routeParams",
    "$timeout",
    function($scope,
        $rootScope,
        config,
        storageService,
        $location,
        $routeParams,
        $timeout) {

        $scope.searchString = $routeParams.id; //Default

        $scope.search = function() {
            $location.url("/search/" + $scope.searchString);
        };

        $scope.loadResults = function() {
            if (!$routeParams.id)
                return;

            alertify.log("Search started");
            $scope.results = [];

            storageService.allDocs().then(function(result) {
                result.rows.filter(storageService.folderFilter).forEach(function(folder) { // search folders
                    if (folder.doc.name.match($routeParams.id)) //search folder name
                        return $scope.results.push(folder);
                });

                result.rows.filter(storageService.noteFilter).forEach(function(note) { //Search notes
                    if (note.doc.title.match($routeParams.id) || note.doc.note.match($routeParams.id)) //search note name and title
                        return $scope.results.push(note);
                });
                $scope.$apply();
                alertify.success($scope.results.length + " objects found");
            });

        };

        //Load results
        $timeout($scope.loadResults);
    }
]);
