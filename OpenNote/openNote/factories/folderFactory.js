/**
 *Folder factory 
 */
openNote.factory("folderFactory", function($resource, userService, config) {
	return $resource(config.servicePath()+"/folder/:levels/:id", {levels: 1}, {
        get: {
            method: "GET",
            headers: { "token": userService.getAPIToken()}
        },
        save: {
            method: "POST",
            headers: { "token": userService.getAPIToken()}
        },
        update: {
            method: "PUT",
            headers: { "token": userService.getAPIToken()}
        },
        remove: {
            method: "DELETE",
            headers: { "token": userService.getAPIToken()}
        }
    });
 });