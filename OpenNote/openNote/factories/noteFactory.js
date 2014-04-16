/**
 *Note factory 
 */
openNote.factory("noteFactory", function($resource, userService, config) {
	return $resource(config.servicePath()+"/note/1000/:id", { }, {
        get: {
            method: "GET",
            headers: { "token": userService.getAPIToken()}
        },
        save: {
            method: "POST",
            headers: { "token": userService.getAPIToken()}
        },
        remove: {
            method: "DELETE",
            headers: { "token": userService.getAPIToken()}
        }
    });
 });