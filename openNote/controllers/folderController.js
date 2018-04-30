import openNote from "../openNote.js";
openNote.controller("folderController", ["$scope",
    "$rootScope",
    "$location",
    "$routeParams",
    "tagService",
    "storageService",
    "config",
    "$timeout",
    function($scope,
        $rootScope,
        $location,
        $routeParams,
        tagService,
        storageService,
        config,
        $timeout) {
        $rootScope.buttons = [];
        $scope.folderEditMode = false;
        $scope.currentFolder = {};
        $scope.parentFolder = null;
        $scope.currentFolderContents = [];

        //add buttons
        if ($routeParams.id)
            $rootScope.buttons.push({
                id: "newNote",
                text: "New note",
                action: function() {
                    $scope.fadeOutFoldersAndNotes(function() {
                        $location.url("/note/").search("folderID", $scope.currentFolder._id);
                    });
                }
            });

        //Create a folder
        $rootScope.buttons.push({
            id: "newFolder",
            text: "New folder",
            action: function() {
                var prompt = "Please enter a name for the new folder";

                if ($scope.currentFolder.name)
                    prompt += " that will be created in " + $scope.currentFolder.name;

                alertify.prompt(
                    prompt,
                    function(confirm, data) {
                        if (!confirm)
                            return;

                        var folder = {
                            parentFolderID: $scope.currentFolder._id,
                            name: data
                        };

                        createFolder(folder);
                    },
                    "");
            }
        });

        if ($routeParams.id)
            $rootScope.buttons.push({
                text: "Cut",
                action: function() {
                    $rootScope.clipboard = $scope.currentFolder;
                    alertify.success("Folder copied to clipboard");
                }
            });

        if ($rootScope.clipboard && $rootScope.clipboard != $scope.currentFolder)
            $rootScope.buttons.push({
                text: "Paste",
                action: function() {
                    $rootScope.$emit("moveKey", { //fire off an event to tell everyone we just modified a folder
                        destFolder: $scope.currentFolder,
                        moveObject: $rootScope.clipboard
                    });
                    $rootScope.clipboard = null;
                }
            });

        $rootScope.buttons.push({
            text: "Search",
            action: function() {
                $location.url("/search/");
            }
        });

        /**
         * Load current folder contents
         */
        $scope.loadCurrentFolder = function() {
            //Load the folder
            if (!$routeParams.id) {
                $scope.currentFolder = { //FIXME multiple DBs
                    _id: null,
                    name: "Home"
                };
                loadCurrentFolderContents();
            } else {
                storageService.get($routeParams.id).then(function(doc) {
                    $scope.currentFolder = doc;
                    loadCurrentFolderContents();

                    if (!$scope.currentFolder.parentFolderID)
                        $scope.parentFolder = {
                            name: "Home"
                        };
                    else
                        storageService.get($scope.currentFolder.parentFolderID).then(function(doc) {
                            $scope.parentFolder = doc;
                            $scope.$apply();
                        });
                });
            }
        };

        /**
         * Activate folder edit mode if we are not in the home folder
         */
        $scope.activateFolderEditMode = function() {
            if ($scope.currentFolder._id)
                $scope.folderEditMode = !$scope.folderEditMode;
        };



        /**
         * Rename the current folder
         */
        $scope.renameFolder = function() {
            alertify.prompt("Rename " + $scope.currentFolder.name + " to:",
                function(confirm, data) {
                    if (!confirm)
                        return;

                    $scope.currentFolder.name = data;
                    storageService.put($scope.currentFolder).then(function(result) {
                        $scope.currentFolder._rev = result.rev;
                        $rootScope.$emit("reloadListView", {});
                        $scope.$apply();
                    }).catch(function(error) {
                        throw error;
                        console.error(error);
                        //FIXME conflict resolution
                    });
                },
                $scope.currentFolder.name //show the current folder name
            );
        };

        /**
         * Remove this folder and all sub items
         */
        $scope.removeFolder = function() { //FIXME Clear orphans
            alertify.confirm("Are you sure you want to delete " + $scope.currentFolder.name + " and all subfolders and notes it contains?",
                function(confirm) {
                    if (!confirm)
                        return;

                    var parentFolderID = $scope.currentFolder.parentFolderID;
                    tagService.deleteFolder($scope.currentFolder).then(function(){ // This needs to be done synchronously instead of an event because its possible for the storage service delete loop to get ahead and destoy the notes before the tag service has a change to delete them.
                        storageService.deleteFolder($scope.currentFolder, function() {
                            $rootScope.$emit("reloadListView", {});

                            if (!parentFolderID)
                                $location.url("/folder/");
                            else
                                $location.url("/folder/" + parentFolderID);

                            $scope.$apply();
                        });
                    });
                });
        };

        /**
         * Listen to changed folder events to see if its the current open folder
         */
        $rootScope.$on("changedFolder", function(event, request) {
            if (request.folder.parentFolderID == $scope.currentFolder.id || $scope.currentFolder.id == request.oldparentFolderID) { //does the change effect us?
                $scope.loadCurrentFolder(); //reload
            }
        });

        /**
         * Create a folder object
         */
        var createFolder = function(folder) {
            folder.type = "folder";
            storageService.post(folder).then(function(response) {
                if (!response.ok){
                    alertify.error("There was an error creating the folder");
                    console.error(response);
                    throw response;
                }
                $rootScope.$emit("reloadListView", {});
                $location.url("/folder/" + response.id);
                $scope.$apply();

            }).catch(function(error) {
                alertify.error("There was an error creating the folder");
                console.error(error);
                throw error;
            });
        };

        /**
         * Load the current folders contents
         */
        var loadCurrentFolderContents = function() {
            storageService.loadFolderContents($scope.currentFolder._id).then(function(results) {
                $scope.currentFolderContents = results.rows;

                $scope.$apply();
            });
        };

        //Load current folder
        $timeout($scope.loadCurrentFolder);
    }
]);
