/**
 *Folder factory 
 */
openNote.factory("folderFactory", function($resource, userService, config) {
	return $resource(config.servicePath()+"/folder/:levels/:id", {levels: 1}, {
        get: {
            method: "GET"
        },
        save: {
            method: "POST"
        },
        update: {
            method: "PUT"
        },
        remove: {
            method: "DELETE"
        }
    });
 });