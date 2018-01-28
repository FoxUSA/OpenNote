import openNote from "../openNote.js";
var TagService = require("../../../OpenNote-SharedServices/Tag.service.js");
openNote.service("tagService", ["$rootScope","storageService", function ($rootScope,storageService) {

    // Wrapper for event emmit;
    var eventEmitter = function(title){
         $rootScope.$emit(title); // When passing in $rootScope.$emit dirrectly got a weird error
    };

    var tagService = TagService(storageService, eventEmitter);
    /**
     * Bind handlers to the root scope
     */
    this.bindHandlers = function(){
        $rootScope.$on("noteSaved", function(event, note) {
            tagService.saveNote(note);
        });


        //$rootScope.$emit
        $rootScope.$on("noteDeleted", function(event, note) {
            tagService.deleteNote(note);
        });
    };

    this.getMap = tagService.getMap;
    this.deleteFolder = tagService.deleteFolder;
}]);
