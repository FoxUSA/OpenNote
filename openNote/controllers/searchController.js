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

        // Handle search button
        $scope.search = function() {
            if(!$scope.searchString || !$scope.searchString.length)
                return alertify.error("A query must be specified");
            $location.url("/search/" + encodeURIComponent($scope.searchString));
        };

        //Load results from URI parameter
        $scope.loadResults = function() {
            var searchRegex = new RegExp($routeParams.id,"i");
            alertify.log("Search started");
            $scope.results = [];

            storageService.allDocs().then(function(result) {
                result.rows.filter(storageService.folderFilter).forEach(function(folder) { // search folders
                    if (folder.doc.name.match(searchRegex)) //search folder name
                        return $scope.results.push(folder);
                });

                result.rows.filter(storageService.noteFilter).forEach(function(note) { //Search notes
                    if (note.doc.title.match(searchRegex) || note.doc.note.match($routeParams.id)) //search note name and title
                        return $scope.results.push(note);
                });
                $scope.$apply();
                alertify.success($scope.results.length + " objects found");
            });

        };

        //Load results if set
        if ($routeParams.id)
            $timeout($scope.loadResults);
    }
]);
