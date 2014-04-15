/**
 *Folder factory 
 */
openNote.factory("folderFactory", function($resource, userService) {
    var folder = $resource(config.servicePath+"folder/1/:id", { }, {
        get: {
            method: "GET",
            headers: { "token": userService.getApiToken()}
        },
        save: {
            method: "POST",
            headers: { "token": userService.getApiToken()}
        },
        update: {
            method: "PUT",
            headers: { "token": userService.getApiToken()}
        },
        remove: {
            method: "DELETE",
            headers: { "token": userService.getApiToken()}
        }
    });
    return folder;
 });